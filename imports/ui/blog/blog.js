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
    Meteor.call('post.insert', {title, content});
    $('#title').val('');
    $('#content').val('');
  },
  'click .remove': function() {
    Meteor.call('post.remove', this._id);
  },
  'click .share': function(event) {
    let email = event.target.previousSibling.value;
    Meteor.call('post.share', {
      postId: this._id,
      email
    });
    event.target.previousSibling.value = '';
  }
});

Template.Blog.helpers({
  posts() {
    return posts.find({}); 
  }
})
