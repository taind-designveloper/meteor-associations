import {users} from './collections/users.js';
import {posts} from './collections/posts.js';

//  posts that user owns
let ownedPost = {
  on: 'ownedPost',
  query: function() {
    return {
      'permission.owners': this._id,
    }
  },
  insert: function(post) {
    post.permission = {
      owners: [this._id],
      comments: [this._id],
      reads: [this._id],
      edits: [this._id],
    }
    return true;
  },
}
// posts that user can read
let readPost = {
  on: 'readPost',
  query: function() {
    return {
      'permission.reads': this._id,
    }
  },
  insert: ()=> false,
  update: ()=> false,
  remove: ()=> false,
}
// 
users.has(posts, ownedPost);
users.has(posts, readPost);

posts.allow({
  insert(userId, post) {
    return ownedPost.insert.apply({
      _id: userId,
    }, [post]);
  },
  remove(userId, post) {
    if(!userId) return false;
    let user = users.findOne(userId);
    return user.belongsTo('ownedPost', post._id);
  }
});

export{posts, users};
