App.private_conversation = App.cable.subscriptions.create("Private::ConversationChannel", {
  connected: function() {},
  dicconnected: function() {},
  received: function(data) {}
});
