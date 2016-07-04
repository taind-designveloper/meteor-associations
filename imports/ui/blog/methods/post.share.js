Meteor.methods({
  'post.share'(sharePost) {
    check(sharePost, {
      postId: String,
      email: String,
    })
    let user = Meteor.user();
    if(!user) return;
    let targetUser = Accounts.findUserByEmail(sharePost.email);
    if(!targetUser || targetUser._id === user._id) return;
    user.ownedPost.findOne(sharePost._id).share(targetUser._id);
  }
})
