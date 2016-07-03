import {users} from './collections/users.js';
import {posts} from './collections/posts.js';
// ownedPost relationship
class ownedPost extends Association {
  query() {
    return {
      'permission.owners': this._id,
    }
  }
  insert(post) {
    post.permission = {
      owners: [this._id],
      comments: [this._id],
      reads: [this._id],
      edits: [this._id],
    }
    return true;
  }
}
// readPost relationship
class readPost extends Association {
  query() {
    return {
      'permission.reads': this._id,
    }
  }
}

users.has(posts, new ownedPost());
users.has(posts, new readPost());

posts.allow({
  insert(userId, post) {
    let insert = new ownedPost().associate().insert;
    return insert.apply({
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
