Phones = new Mongo.Collection('phones');

validatePhone = function (phone) {
  var errors = {};
  if (!phone.title)
    errors.title = "Please fill in a title";
  if (!phone.name)
    errors.name =  "Please fill in a name";
  if (!phone.email)
    errors.email =  "Please fill in an email";
  if (!phone.phoneNumber)
    errors.phoneNumber =  "Please fill in a phone Number";
  return errors;
}

Phones.allow({
  update: function(phone) {return true},
  remove: function(phone) {return true},
});

Meteor.methods({
  phoneInsert: function(phoneAttributes) {
    check(phoneAttributes, {
      name: String,
      title: String,
      phoneNumber: String,
      email: String
    });

    var errors = validatePhone(phoneAttributes);
    if (errors.name || errors.title || errors.email || errors.phoneNumber)
      throw new Meteor.Error('invalid-phone', "You must set all attributes for your phone entry");

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
