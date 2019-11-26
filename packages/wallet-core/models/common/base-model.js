import { getRealmInstance } from '../../db/realm-service';

export class BaseModel {
  constructor(schema) {
    this.schema = schema;
  }

  get realm() {
    return getRealmInstance();
  }

  create(props) {
    return this.realm.write(() => {
      return this.realm.create(this.schema.name, props);
    });
  }

  removeById(id) {
    return this.realm.write(() => {
      const item = this.findById(id);
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

  findAll() {
    return Array.from(this.realm.objects(this.schema.name)).map(this.toJson);
  }

  findById(id) {
    const items = this.findAll().filtered(`id = ${id}`);
    return items[0];
  }

  updateById(id, data) {
    return this.realm.write(() => {
      return this.realm.create(this.schema.name, {
        ...data,
        id,
      }, true);
    });
  }

  toJson(realmObject) {
    const data = {};

    Object.keys(realmObject).map(key => {
      data[key] = realmObject[key];
    });

    return data;
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
    let results = results = this.findAll();

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
