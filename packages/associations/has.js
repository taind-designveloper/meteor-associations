import {Association} from './association';

Mongo.Collection.prototype.has = function(target, props) {
  this.associations = this.associations || [];
  this.associations.push({target, props: props.associate()});
  this._transform = (doc)=> {
    this.associations.forEach(({target, props})=> {
      doc[props.on] = {
        /*
         * insert new document, add query to target doc by default 
         * @param {Object} targetDoc : document will be inserted
         */
        insert(targetDoc) {
          let query = props.query.apply(doc);
          _.extend(doc, {$query: query});
          if(props.insert) { 
            let isAllowed = props.insert.apply(doc, [targetDoc])
            if(!isAllowed) return ;
            return target.insert(targetDoc);
          } 
          // insert final doc
          let insertDoc = _.extend(targetDoc, query);
          return target.insert(insertDoc);
        },
        /*
        *  update document
        *  @param {Object} selector 
        *  @param {Object} modifier  
        *  @param {Object} multiplier
         */
        update(selector, modifier, multiplier) {
          selector = selector || {}; 
          modifier = modifier || {};
          multiplier = multiplier || {};
          let query = props.query.apply(doc);
          let context = _.extend(doc, {$query: query});
          if(typeof selector === 'string') 
            selector = {_id: selector}
          _.extend(selector, query);
          if(props.update) {
            let isAllowed = props.update.apply(context, [selector, modifier, multiplier])
            if(!isAllowed) return 0;
          }
          let keys = Object.keys(selector);
          if(keys.length === 1 && keys[0] === '_id') 
            selector = selector._id;
          return target.update(selector, modifier, multiplier);
        },
        /*
        * find documents 
        * @param {Object} selector
        * @param {Object} projector
        */
        find(selector, projector) {
          selector = selector || {}; 
          projector = projector || {};
          let query = props.query.apply(doc);
          let context = _.extend(doc, {$query: query});
          if(typeof selector === 'string') 
            selector = {_id: selector}
          _.extend(selector, query);
          if(props.find) {
            let isAllowed  = props.find.apply(context, [selector, projector])
            if(!isAllowed) return [];
          }
          return target.find(selector, projector);
        },
        /*
        * find one document
        * @param {Object} selector
        * @param {Object} projector
        */
        findOne(selector, projector) {
          selector = selector || {}; 
          projector = projector || {};
          let query = props.query.apply(doc);
          let context = _.extend(doc, {$query: query});
          if(typeof selector === 'string') 
            selector = {_id: selector}
          _.extend(selector, query);
          if(props.findOne) {
            let isAllowed = props.findOne.apply(context, [selector, projector])
            if(!isAllowed) return;
          }
          return target.findOne(selector, projector);
        },
        /*
        * remove documents 
        * @param {Object} selector
        * */
        remove(selector) {
          selector = selector || {}; 
          let query = props.query.apply(doc);
          let context = _.extend(doc, {$query: query});
          if(typeof selector === 'string') 
            selector = {_id: selector}
          _.extend(selector, query);
          if(props.remove) {
            let isAllowed = props.remove.apply(context, [selector])
            if(!isAllowed) return 0;
          }
          let keys = Object.keys(findQuery);
          if(keys.length === 1 && keys[0] === '_id') 
            selector = selector._id;
          return target.remove(selector);
        }
      }
    });
    doc.belongsTo = (relations, targetId)=> {
      if(!_.isArray(relations)) relations = [relations];
      for(let i = 0; i < relations.length; i++) {
        let relation = relations[i];
        if(doc[relation]) {
          let target = doc[relation].findOne(targetId);
          if(target) return true;
        } 
      }
      return false;
    }
    return doc;
  }
}
export {Association};
