// readPost relationship
class readPost extends Association {
  query() {
    return {
      'permission.reads': this._id,
    }
  }
}
export {readPost};
