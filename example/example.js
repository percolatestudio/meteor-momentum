if (Meteor.isClient) {
  var Items = new Meteor.Collection(null);
  var Notifications = new Meteor.Collection(null);
  
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
  });
  
  Template.growl.helpers({
    notifications: function() {
      return Notifications.find({}, {sort: {createdAt: -1}});
    }
  })
  
  Template.growl.events({
    'click [data-add-notification]': function() {
      var id = Notifications.insert({
        title: 'Notification no. ' + Notifications.find().count(),
        createdAt: new Date
      });
      
      Meteor.setTimeout(function() {
        Notifications.remove({_id: id});
      }, 3000);
    }
  });
}