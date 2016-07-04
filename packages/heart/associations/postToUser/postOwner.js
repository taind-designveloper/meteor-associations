class postOwner extends Association {
  query() {
    return {
      _id: {
        $in: this.permission.owners
      }
    }
  }
  email() {
    console.log(this);
    if(this.emails) return this.emails[0].address;
    return 'unknow';
  }
}
export {postOwner};
