Phones = new Mongo.Collection('phones');

Phones.allow({
  update: function(phone) {return true},
  remove: function(phone) {return true},
});

Phones.deny({
  update: function(phone, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'name', 'title', 'phoneNumber', 'email').length > 0);
  }
});

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

    if (phoneWithSameNumber) {
      return {
        phoneExists: true,
        _id: phoneWithSameNumber._id
      }
    }

    if (phoneWithSameName) {
      return {
        personExists: true,
        _id: phoneWithSameName._id
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
