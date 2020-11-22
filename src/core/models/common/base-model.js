const convertToObject = (realmObject, maxDepth = 3, depth = 0) => {
  depth++;
  if (depth > maxDepth) {
      return realmObject;
  }

  if (typeof realmObject !== 'object') {
      return realmObject;
  }

  if (realmObject === null) {
      return null;
  }

  let keys = Object.getOwnPropertyDescriptors(realmObject);

  if (typeof realmObject.objectSchema === 'function') {
      keys = realmObject.objectSchema().properties;
  }

  let object = {};

  for (const key in keys) {
      if (realmObject.hasOwnProperty(key)) {
          //We don't follow linkinh objects
          if (keys[key].type === 'linkingObjects') {
              object[key] = realmObject[key];
          } else if (isString(realmObject[key])) {
              object[key] = realmObject[key];
          } else if (isArrayLike(realmObject[key]) && !isString(realmObject[key])) {
              object[key] = realmObject[key].map(item =>
                  convertToObject(item, maxDepth, depth, key),
              );
          } else {
              object[key] = convertToObject(realmObject[key], maxDepth, depth, key);
          }
      }
  }
  return object;
};

export class BaseModel {
  constructor(schema) {
    this.schema = schema;
    this.ModelClass = null;

    this.toJson = this.toJson.bind(this);
  }

  // Will be defined later
  static getRealmInstance = () => null;

  get realm() {
    return BaseModel.getRealmInstance();
  }

  beforeCreate(props) {
    return props;
  }

  async create(props) {
    // try {
      let result;

      if (this.beforeCreate) {
        props = this.beforeCreate(props);
      }

      this.realm.write(() => {
        result = this.realm.create(this.schema.name, props);
      });


      return this.toJson(result);
    // } catch(err) {
    //   console.log('Error creating entity with props: ', props);
    //   console.error(err);
    //   throw err;
    // }
  }

  removeById(id) {
    return this.realm.write(() => {
      const item = this._findById(id);
      this.realm.delete(item);
    });
  }

  write(func) {
    return this.realm.write(func);
  }

  removeAll() {
    return this.write(() => {
      let allItems = this.realm.objects(this.schema.name);
      this.realm.delete(allItems);
    });
  }

  _findAll() {
    return this.realm.objects(this.schema.name);
  }

  findAll() {
    return Array.from(this._findAll()).map(this.toJson);
  }

  prepareIdValue(value) {
    return value;
  }

  _findById(id) {
    const items = this._findAll().filtered(`${this.schema.primaryKey} = $0`, id);
    return items[0];
  }

  findById(id) {
    return this.toJson(this._findById(id));
  }

  async updateById(id, data) {
    const currentData = this.findById(id);

    if (this.beforeUpdate) {
      data = this.beforeUpdate(data);
    }

    return this.realm.write(() => {
      return this.realm.create(this.schema.name, {
        ...(currentData || {
          id,
        }),
        ...data,
      }, true);
    });
  }

  async addOrUpdate(data) {
    const id = data[this.schema.primaryKey];
    return this.updateById(id, data);
  }

  generateId() {
    const items = this._findAll().sorted(this.schema.primaryKey);
    if (!items.length) {
      return 1;
    }

    const lastItem = items[items.length - 1];

    return lastItem.id + 1;
  }

  toJson(realmObject) {
    if (!realmObject) {
      return realmObject;
    }

    // const data = convertToObject(realmObject);
    
    // Object.keys(realmObject).map(key => {
    //   data[key] = realmObject[key];
    // });

    let data = realmObject.toJSON();

    if (this.applyCustomMapping) {
      data = this.applyCustomMapping(data);
    }

    // console.log('convert realm to objecdt', data);

    return data;
  }

  toJsonArray(items) {
    return Array.from(items).map(this.toJson) 
  }
  /**
   * Query example: color = "tan" AND name BEGINSWITH "B"
   * @param {string} query query string
   *
   * The query language supported by Realm is inspired by Apple’s NSPredicate
   * https://realm.io/docs/javascript/latest#filtering
   * https://developer.apple.com/documentation/foundation/nspredicate
   *
   */
  find(query, ...args) {
    let results = this._findAll();

    if (query) {
      results = results.filtered(query, ...args);
    }

    console.log('find results', results);

    return this.toJsonArray(results);
  }

  findSorted(query, sort, ...args) {
    let results = this._findAll().sorted(sort);

    if (query) {
      results = results.filtered(query, ...args);
    }

    return Array.from(results).map(this.toJson);
  }

  findOne(query, ...args) {
    const items = this.find(query, ...args);
    console.log('Find one result', items);
    return items[0];
  }
}
