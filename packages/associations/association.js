class Association {
  query() {
    return {};
  }
  insert() {
    return false;
  }
  find() {
    return true;
  }
  findOne() {
    return true;
  }
  update() {
    return false;
  }
  remove() {
    return false;
  }
  associate() {
    let func = (f)=> typeof f === 'function';
    let template = {
      on: this.constructor.name,
      query: this.query,
      insert: this.insert,
      find: this.find,
      findOne: this.findOne,
      update: this.update,
      remove: this.remove,
    }
    check(template, {
      on: String,
      query: Match.Where(func),
      insert: Match.Where(func),
      find: Match.Where(func),
      findOne: Match.Where(func),
      update: Match.Where(func),
      remove: Match.Where(func),
    })
    return template;
  }
}
export {Association};
