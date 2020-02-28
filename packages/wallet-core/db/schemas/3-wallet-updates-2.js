/* AUTO GENERATED FILE - DON'T CHANGE THE CONTENT */

export default {
  "schemaVersion": 3,
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
        "balance": {
          "type": "string?",
          "default": "0"
        },
        "unlockCount": {
          "type": "int?",
          "default": 0
        },
        "txHistoryLastSyncedBlock": {
          "type": "int?",
          "default": 0
        },
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
    },
    {
      "name": "TxHistory",
      "primaryKey": "hash",
      "properties": {
        "hash": "string",
        "blockNumber": "int?",
        "timeStamp": "int",
        "nonce": "int",
        "blockHash": "string?",
        "contractAddress": "string?",
        "from": "string",
        "to": "string",
        "value": "double",
        "tokenName": "string?",
        "tokenSymbol": "string?",
        "tokenDecimal": "int?",
        "transactionIndex": "int?",
        "status": "string?",
        "gas": "int?",
        "gasPrice": "int",
        "gasUsed": "int?",
        "confirmations": "int?",
        "isError": "bool?",
        "txReceiptStatus": "int?",
        "networkId": "int?"
      }
    }
  ]
}