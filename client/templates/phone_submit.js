Template.phoneSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var phone = {
      name: $(e.target).find('[name=name]').val(),
      email: $(e.target).find('[name=email]').val(),
      phoneNumber: $(e.target).find('[name=phoneNumber]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    Meteor.call('phoneInsert', phone, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

        // route to existing phone
        if (result.phoneExists)
         throwError('This phone has already been posted');
        // route to existing person
        if (result.personExists)
          throwError('This person has already been posted');

      Router.go('phonePage', {_id: result._id});
    });
  }
});
