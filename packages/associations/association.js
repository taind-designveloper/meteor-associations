class Association {
  query() {
    return {};
  }
  insert() {
    return true;
  }
  find() {
    return true;
  }
  findOne() {
    return true;
  }
  update() {
    return true;
  }
  remove() {
    return true;
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
  actions() {
    let actions = {};
    for(let actionName in this) {
      let unexpectedActions = [
        'query', 
        'insert', 
        'find', 
        'findOne', 
        'update', 
        'remove', 
        'associate', 
        'actions'
      ]
      if(unexpectedActions.indexOf(actionName) === -1) {
        if(typeof this[actionName] === 'function') {
          actions[actionName] = this[actionName];
        }
      }
    }
    actions._self = this;
    return actions;
  }
}
export {Association};
