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
export {ownedPost};
