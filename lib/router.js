Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('phones');
  }
});

Router.route('/', {name: 'phonesList'});

Router.route('/phones/:_id', {
  name: 'phonePage',
  data: function() { return Phones.findOne(this.params._id); }
});

Router.route('/submit', {
  name: 'phoneSubmit'
});

Router.onBeforeAction('dataNotFound', {only: 'phonePage'});
