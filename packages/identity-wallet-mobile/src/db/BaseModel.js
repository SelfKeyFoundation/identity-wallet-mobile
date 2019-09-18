import { getRealm } from './realm-service';

export class BaseModel {
  constructor(schema) {
    this.realm = getRealm();
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
