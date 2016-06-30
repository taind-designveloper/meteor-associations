let posts = new Mongo.Collection('posts');
let postSchema = new SimpleSchema({
  _id: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  'permission.owners': {
    type: [String]
  },
  'permission.comments': {
    type: [String],
  },
  'permission.reads': {
    type: [String],
  },
  'permission.edits': {
    type: [String],
  }
})

posts.attachSchema(postSchema);

export {posts};
