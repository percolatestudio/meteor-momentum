if (Meteor.isClient) {
  var Items = new Meteor.Collection(null);
  
  Session.setDefault('foo', true)
  Template.hello.helpers({
    foo: function() {
      return Session.get('foo');
    },
    
    items: function() {
      return Items.find();
    }
  });
  
  Template.hello.events({
    'click .if-container': function() {
      Session.set('foo', ! Session.get('foo'));
    },

    'click .each-container': function() {
      Items.insert({});
    }
  })
}