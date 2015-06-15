// Local (client-only) collection
Errors = new Mongo.Collection(null);

throwError = function(message) {
  Materialize.toast(message, 4000, 'red');
};
