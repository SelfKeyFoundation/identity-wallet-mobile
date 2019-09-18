import Realm from 'realm';

const WalletSchema = {
  name: 'wallet',
  properties: {
    name:     'string',
    privateKey: 'string',
    password: 'string',
  },
};

class RealmModel {
  constructor(realm, schema) {
    this.realm = realm;
    this.schema = schema;
  }

  create(props) {
    return this.realm.create(this.schema.name, props);
  }
}

function init() {
  Realm.open({schema: [WalletSchema]})
    .then(realm => {
      realm.create('wallet', {
        name: 'test wallet',
        privateKey: '<private-key>',
        password: 'encrypted-pwd',
      });
    })
    .catch(error => {
      // Handle the error here if something went wrong
    });
}