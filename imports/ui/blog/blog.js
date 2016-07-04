import './blog.html';
import './blog.css';
Template.Blog.onCreated(function() {
  this.subscribe('posts.all');
});
Template.Blog.events({
  'click #submit-post': ()=> {
    let user = Meteor.user();
    let title = $('#title').val();
    let content = $('#content').val();
    if(user) user.ownedPost.insert({title, content});
    $('#title').val('');
    $('#content').val('');
  },
  'click .remove': function() {
    Meteor.call('post.remove', this._id);
  },
  'click .share': function(event) {
    let email = event.target.previousSibling.value;
    console.log(email);
  }
});

Template.Blog.helpers({
  posts() {
    return posts.find({}); 
  }
})
