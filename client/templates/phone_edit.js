Template.phoneEdit.onCreated(function() {
  Session.set('phoneEditErrors', {});
});
Template.phoneEdit.helpers({
  errorMessage: function(field) {
    return Session.get('phoneEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('phoneEditErrors')[field] ? 'red darken-1' : '';
  }
});

Template.phoneEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPhoneId = this._id;

    var phoneProperties = {
      name: $(e.target).find('[name=name]').val(),
      email: $(e.target).find('[name=email]').val(),
      phoneNumber: $(e.target).find('[name=phoneNumber]').val(),
      title: $(e.target).find('[name=title]').val()
    }

    var errors = validatePhone(phoneProperties);
    if (errors.title || errors.name || errors.email || errors.phoneNumber)
      return Session.set('phoneEditErrors', errors);

    Phones.update(currentPhoneId, {$set: phoneProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('phonePage', {_id: currentPhoneId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this phone number?")) {
      var currentPhoneId = this._id;
      Phones.remove(currentPhoneId);
      Router.go('phonesList');
    }
  }
});
