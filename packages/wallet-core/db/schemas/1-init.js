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
      "name": "Wallet",
      "primaryKey": "address",
      "properties": {
        "address": "string",
        "name": "string",
        "vaultId": "string",
        "type": "string",
        "path": "string?",
        "tokens": {
          "type": "WalletToken[]",
          "default": []
        }
      }
    },
    {
      "name": "GuideSettings",
      "primaryKey": "id",
      "properties": {
        "id": "int",
        "termsAccepted": "bool"
      }
    },
    {
      "name": "Token",
      "primaryKey": "id",
      "properties": {
        "id": "int",
        "decimal": "int",
        "address": "string",
        "icon": "string?",
        "isCustom": {
          "type": "bool",
          "default": false
        },
        "symbol": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    },
    {
      "name": "WalletToken",
      "primaryKey": "id",
      "properties": {
        "id": "int",
        "balance": {
          "type": "string",
          "default": "0"
        },
        "balanceInFiat": {
          "type": "float",
          "default": 0
        },
        "hidden": {
          "type": "bool",
          "default": false
        },
        "tokenId": "int"
      }
    }
  ]
}