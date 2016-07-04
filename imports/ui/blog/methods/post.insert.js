Meteor.methods({
  'post.insert'(post) {
    check(post, {
      title: String,
      content: String,
    })
    let user = Meteor.user();
    if(!user) return;
    user.ownedPost.insert(post);
  }
})
