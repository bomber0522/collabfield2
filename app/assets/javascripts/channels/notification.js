ApplicationCache.notification = App.cable.subscriptions.create("NotificationChannel", {
  connected: function() {},
  disconnected: function() {},
  received: function(data) {
    // if a contact request was accepted
    if (data['notification'] == 'accepted-contact-request') {

    }
    // if a contact request was received
    if (data['notification'] == 'contact-request-received') {
      conversation_window = $('body').find('[data-pconversation-user-name="' + data["send_name"] + '"]');
      has_no_contact_request = $('#contacts-requests ul').find('no-requests');
      contact_request = data['contact_request'];

      if (has_no_contact_requests.length) {
        // remove has no contact request message
        has_no_contact_requests.remove();
      }

      if (conversation_window.length) {
        // remove add user to contacts button
        conversation_window.find('.add-user-to-contacts-messages').parent().remove();

        conversation_window.find('.add-user-to-contacts').remove();
        conversation_window.find('.conversation-heading').css('width', '360px');
      }

      // append a new contact request
      $('#contacts-requests ul').presend(contact_request);
      calculateContactRequests();
    }
  },
  contact_request_response: function(sender_user_name, receiver_user_name, notification) {
    return this.perform('contact_request_response', {
      sender_user_name: sender_user_name,
      receiver_user_name: receiver_user_name,
      notification: notification
    });
  }
});
