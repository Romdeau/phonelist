Template.phoneEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPhoneId = this._id;

    var phoneProperties = {
      name: $(e.target).find('[name=name]').val(),
      phoneNumber: $(e.target).find('[name=phoneNumber]').val(),
      email: $(e.target).find('[name=email]').val(),
      title: $(e.target).find('[name=title]').val()
    }

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
