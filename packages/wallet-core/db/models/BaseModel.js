import { getRealmInstance } from '../realm-service';

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

  getAll() {
    return this.realm.objects(this.schema.name);
  }
}
