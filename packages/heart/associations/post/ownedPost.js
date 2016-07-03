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
  share(userId) {
    let {target, selector} = this.ctx;
    target.update(selector, {
      $push: {
        'permission.reads': userId,
      }
    })
  }
}
export {ownedPost};
