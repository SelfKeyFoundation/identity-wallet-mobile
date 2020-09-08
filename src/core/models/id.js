
// Profile
// class IdentityModel {
//   static schema = {
//     name: 'Identity',
//     primaryKey: 'id',
//     properties: {
//       id: 'int',
//       walletId: 'int',
//       name: 'string?',
//       // type: 'string'
//       profilePicture: 'data?'
//       isSetupFinished: {
//         type: 'bool',
//         default: false,
//       }
//       // id: { type: 'integer' },
//       // walletId: { type: 'integer' },
//       // parentId: { type: ['integer', null] },
//       // rootIdentity: { type: 'boolean', default: true },
//       // name: { type: 'string' },
//       // type: { type: 'string' },
//       // profilePicture: { type: 'binary' },
//       // did: { type: 'string' },
//       // isSetupFinished: { type: 'boolean', default: false },
//     },
//   };
// }

// class IdAttributeTypeModel {
//   static schema = {
//     name: 'IdAttributeType',
//     primaryKey: 'id',
//     properties: {
//       id: 'int',
//       url: 'string',
//       defaultRepositoryId: 'int',
//       content: 'string',
//       expires: 'date?',      
//       env: 'string?'
//       // id: { type: 'integer' },
//       // url: { type: 'string' },
//       // defaultRepositoryId: { type: 'integer' },
//       // content: { type: 'object' },
//       // expires: { type: 'integer' },
//       // env: { type: 'string', enum: ['production', 'development'], default: env }
//     },
//   }
// }

// class IdAttributeModel {
//   static schema = {
//     name: 'IdAttribute',
//     primaryKey: 'id',
//     properties: {
//       id: 'int',
//       name: 'string',
//       identityId: 'int',
//       // What?
//       typeId: 'int',
//       data: 'string',
//       env: 'string?'
      
//     },
//     // id: { type: 'integer' },
//     // name: { type: 'string' },
//     // identityId: { type: 'integer' },
//     // typeId: { type: 'integer' },
//     // data: { type: 'object' },
//     // env: { type: 'string', enum: ['production', 'development'], default: env }
//   }
// }

// class UISchemaModel {
//   static schema = {
//     name: 'UISchema',
//     primaryKey: 'id',
//     properties: {
//       id: 'int',
//       url: 'string',
//       repositoryId: 'int',
//       attributeTypeId: 'int',
//       content: 'string',
//       expires: 'date?',
//       env: 'string?',
//       // id: { type: 'integer' },
//       // url: { type: 'string' },
//       // repositoryId: { type: 'integer' },
//       // attributeTypeId: { type: 'integer' },
//       // content: { type: 'object' },
//       // expires: { type: 'integer' },
//       // env: { type: 'string', enum: ['production', 'development'], default: env }
//     }
//   };
// }

// class RepositoryModel {
//   static schema = {
//     name: 'Repository',
//     primaryKey: 'id',
//     properties: {
//       id: 'int',
//       url: 'string',
//       name: 'string?',
//       eager: {
//         type: 'bool',
//         default: false,
//       },
//       content: 'string',
//       expires: 'date?',
//       env: 'string?'
//       // id: { type: 'integer' },
//       // url: { type: 'string' },
//       // name: { type: 'string' },
//       // eager: { type: 'boolean', default: false },
//       // content: { type: 'object' },
//       // expires: { type: 'integer' },
//       // env: { type: 'string', enum: ['production', 'development'], default: env }
//     }
//   };
// }
