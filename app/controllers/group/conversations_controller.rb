class Group::ConversationsController < ApplicationController

  def create
    @conversation = create_group_conversation
    add_to_conversations unless already_added?

    respond_to do |format|
      format.js
    end
  end

  def open
    @conversation = Group::Conversation.find(params[:id])
    add_to_conversations unless already_added?
    respond_to do |format|
      format.js { render partial: 'group/conversations/open' }
    end
  end

  def close
    @conversation = Group::Conversation.find(params[:id])

    session[:create_group_conversations].delete(@conversation.id)

    respond_to do |format|
      format.js
    end
  end

  def update
    Group::AddUserToConversationService.new({
      conversation_id: params[:id],
      new_user_id: params[:user][:id],
      added_by_id: params[:added_by]
    }).call
  end

  private

  def add_to_conversations
    session[:create_group_conversations] ||= []
    session[:create_group_conversations] << @conversation.id
  end

  def already_added?
    session[:create_group_conversations],include?(@conversation.id)
  end

  def create_group_conversation
    Group::NewConversationService.new({
      creator_id: params[:creator_id],
      private_conversation_id: params[:private_conversation_id],
      new_user_id: params[:create_group_conversation][:id]
    }).call
  end
end
