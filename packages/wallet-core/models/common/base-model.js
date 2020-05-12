import { getRealmInstance } from '../../db/realm-service';

export class BaseModel {
  constructor(schema) {
    this.schema = schema;
    this.ModelClass = null;

    this.toJson = this.toJson.bind(this);
  }

  get realm() {
    return getRealmInstance();
  }

  create(props) {
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
        ...(currentData || {}),
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

    const data = {};

    Object.keys(realmObject).map(key => {
      data[key] = realmObject[key];
    });

    if (this.applyCustomMapping) {
      return this.applyCustomMapping(data);
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

    if (query) {
      results = results.filtered(query, ...args);
    }

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
    return items[0];
  }
}
