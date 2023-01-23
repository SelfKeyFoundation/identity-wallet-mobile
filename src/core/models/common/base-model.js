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
    let result;

    if (this.beforeCreate) {
      props = this.beforeCreate(props);
    }

    this.realm.write(() => {
      result = this.realm.create(this.schema.name, props);
    });

    return this.toJson(result);
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
    return this._findAll().find(item => item[this.schema.primaryKey] === id)
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
    const items = this._findAll();
    if (!items.length) {
      return 1;
    }

    const lastItem = items[items.length - 1];

    return lastItem[this.schema.primaryKey] + 1;
  }

  toJson(data) {
    if (!data) {
      return data;
    }

    if (this.applyCustomMapping) {
      data = this.applyCustomMapping(data);
    }

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

    if (typeof query === 'string') {
      console.log(query);
      throw new Error('Query cannot be a string');
    }

    if (typeof query === 'function') {
      results = results.filter(query);
    }

    return this.toJsonArray(results);
  }

  findSorted(query, sort, ...args) {
    let results = this._findAll();

    if (query) {
      results = results.filtered(query, ...args);
    }

    return Array.from(results).map(this.toJson);
  }

  findOne(func = () => true) {
    if (typeof func !== 'function') {
      debugger;
    }

    return this.findAll().find(func);
  }
}
