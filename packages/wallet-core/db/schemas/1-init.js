/* AUTO GENERATED FILE - DON'T CHANGE THE CONTENT */

export default {
  "schemaVersion": 1,
  "schema": [
    {
      "name": "test",
      "primaryKey": "id",
      "properties": {
        "id": {
          "type": "int"
        },
        "name": {
          "type": "string"
        }
      }
    },
    {
      "name": "wallet",
      "primaryKey": "id",
      "properties": {
        "id": {
          "type": "int"
        },
        "name": {
          "type": "string"
        },
        "publicKey": {
          "type": "string"
        },
        "privateKey": {
          "type": "string"
        }
      }
    }
  ]
}