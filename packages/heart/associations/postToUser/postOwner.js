class postOwner extends Association {
  query() {
    return {
      _id: {
        $in: this.permission.owners
      }
    }
  }
}
export {postOwner};
