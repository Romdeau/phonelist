Meteor.publish('phones', function() {
  return Phones.find();
});
