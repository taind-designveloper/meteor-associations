import {users} from './collections/users';
import {posts} from './collections/posts';
import {ownedPost} from './associations/userToPost/ownedPost';
import {readPost} from './associations/userToPost/readPost';
/*
 * post to user
 * */
import {postOwner} from './associations/postToUser/postOwner';

users.has(posts, new ownedPost());
users.has(posts, new readPost());
posts.has(users, new postOwner());

export{posts, users};
