Meteor.methods({
  'post.remove'(postId) {
    check(postId, String);
    let user = Meteor.user();
    if(!user) return;
    user.ownedPost.remove(postId);
  }
})
