// readPost relationship
class readPost extends Association {
  query() {
    return {
      'permission.reads': this._id,
    }
  }
  update() {
    return false;
  }
  remove() {
    return false;
  }
}
export {readPost};
