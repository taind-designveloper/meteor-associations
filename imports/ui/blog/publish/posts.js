Meteor.publish('posts.all', function() {
  if(!this.userId) return this.ready();
  return users.findOne(this.userId).readPost.find({});
});
