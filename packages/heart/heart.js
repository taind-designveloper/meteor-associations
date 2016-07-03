import {users} from './collections/users';
import {posts} from './collections/posts';
import {ownedPost} from './associations/post/ownedPost';
import {readPost} from './associations/post/readPost';

users.has(posts, new ownedPost());
users.has(posts, new readPost());

posts.allow({
  insert(userId, post) {
    let insert = new ownedPost().insert;
    return insert.apply({
      _id: userId,
    }, [post]);
  },
  remove(userId, post) {
    if(!userId) return false;
    let user = users.findOne(userId);
    return user.belongsTo('ownedPost', post._id);
  },
  update(userId, post, fields, modifier) {
    if(!userId) return false;
    let user = users.findOne(userId);
    // owner of this post
    if(user.belongsTo('ownedPost', post._id)) {
      return Match.test(modifier, {
        $push: {
          'permission.reads': String,
        }
      })
    }
    return false;
  }
});

export{posts, users};
