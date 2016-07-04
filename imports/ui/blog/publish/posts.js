Meteor.publishComposite('posts.all', {
  find() {
    if(!this.userId) return this.ready();
    return users.findOne(this.userId).readPost.find({});
  },
  children: [
    {
      find(post) {
        let permission = post.permission;
        let userId = [];
        for(let prop in permission) {
          userId = userId.concat(permission[prop]);
        }
        userId = _.uniq(userId);
        return users.find({_id: {$in: userId}});
      }
    }
  ]
})
