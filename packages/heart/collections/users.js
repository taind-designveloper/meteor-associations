let users = Meteor.users;
let userSchema = new SimpleSchema({
  _id: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  services: {
    type: Object,
    blackbox: true
  },
  emails: {
    type: [Object],
    blackbox: true
  }
})
users.attachSchema(userSchema);
export {users};
