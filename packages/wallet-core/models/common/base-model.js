import { getRealmInstance } from '../../db/realm-service';

export class BaseModel {
  constructor(schema) {
    this.realm = getRealmInstance();
    this.schema = schema;
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
    return this.realm.objects(this.schema.name);
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
    return this.findAll().filtered(query, ...args);
  }

  findOne(query, ...args) {
    const items = this.find(query, ...args);
    return items[0];
  }
}
