import '../imports/ui/blog/blog.js';
// sample API
// user --> post
// 1. user has multiple posts
// 2. post can be share under read, edit, comment
// - read: read all content
// - edit: edit edit content and title
// - comment: add new comment
/*
 *  user.has(post, {
 *    on: 'ownedPost',
 *    query() {
 *      owners: this._id
 *    },
 *    find() {},
 *    findOne() {},
 *    update() {},
 *    remove() {}
 *  })
 *  
 * */
//users.has(posts, {
  //on: 'ownedPost',
  //query: function() {
    //return {
      //'permission.owners': this._id
    //};
  //},
  //insert: function(doc) {
    //doc.permission = {
      //owners: [this._id],
      //reads: [this._id],
      //edits: [this._id],
      //comments: [this._id]
    //}
    //return doc;
  //},
//});

//users.has(posts, {
  //on: 'readPost',
  //query: function() {
    //return {
      //'permission.reads': this._id
    //}
  //}, 
  //insert: ()=> false,
  //update: ()=> false,
  //remove: ()=> false,
//});

//users.has(posts, {
  //on: 'editPost',
  //query: function() {
    //return {
      //'permission.edits': this._id
    //}
  //},
  //insert: ()=> false,
  //update: function(selector, modifier) {
    //return Match.test(modifier, {
      //$set: {
        //title: Match.Optional(String),
        //content: Match.Optional(String),
      //}
    //});
  //},
  //remove: ()=> false,
//})

//users.has(posts, {
  //on: 'commentPost',
  //query: function() {
    //return {
      //'permission.comments': this._id
    //}
  //},
  //insert: ()=> false,
  //update: function(selector, modifier) {
    //let allowed = Match.test(modifier, {
      //$push: {
        //comments: {
          //content: String,
        //}, 
      //}
    //});
    //if(!allowed) return false;
    //modifier.$push.comments.userId = this._id;
    //return true;
  //}
//});
