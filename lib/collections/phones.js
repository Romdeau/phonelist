Phones = new Mongo.Collection('phones');

Meteor.methods({
  phoneInsert: function(phoneAttributes) {
    check(phoneAttributes, {
      name: String,
      title: String,
      phoneNumber: String,
      email: String
    });

    var phoneWithSameNumber = Phones.findOne({phoneNumber: phoneAttributes.phoneNumber});
    var phoneWithSameName = Phones.findOne({name: phoneAttributes.name});

    if (phoneWithSameNumber || phoneWithSameName) {
      return {
        phoneExists: true,
        _id: phoneWithSameNumber._id
      }
    }

    var phone = _.extend(phoneAttributes, {
      submitted: new Date()
    });
    var phoneId = Phones.insert(phone);
    return {
      _id: phoneId
    };
  }
});
