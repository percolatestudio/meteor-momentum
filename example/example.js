if (Meteor.isClient) {
  var Items = new Meteor.Collection(null);
  
  Session.setDefault('foo', true)
  Template.css.helpers({
    foo: function() {
      return Session.get('foo');
    },
    
    items: function() {
      return Items.find();
    }
  });
  
  Template.css.events({
    'click .if-container': function() {
      Session.set('foo', ! Session.get('foo'));
    },

    'click .each-container': function() {
      Items.insert({});
    }
  })
}