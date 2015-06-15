Template.phonesList.helpers({
  phones: function() {
    return Phones.find({}, {sort: {name: 1}});
  }
});
