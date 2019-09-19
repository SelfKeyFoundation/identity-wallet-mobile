/**
 * This script will generate a snapshot from the current DB model
 *
 * Model snapshots will be used to perform a linear migration when
 * the schema version is upgraded
 *
 */

import path from 'path';
import fs from 'fs';
import glob from 'glob';
import models from '../models';

const CURRENT_SCHEMA_VERSION = 1;
const SCHEMA_NAME = 'init';

const schemas = models.map(m => m.schema);
const fileDirectory = path.resolve(__dirname, '../db/schemas');
const fileName = `${CURRENT_SCHEMA_VERSION}-${SCHEMA_NAME}.js`;
const disclaimer = '/* AUTO GENERATED FILE - DON\'T CHANGE THE CONTENT */';

function getSchemas() {
  return glob
    .sync(`${fileDirectory}/**.js`)
    .map(f => f.split('/').pop().replace('.js', ''))
    .filter(n => n !== 'index');
}

function createSchemaSnapshot() {
  const body = JSON.stringify({
    schemaVersion: CURRENT_SCHEMA_VERSION,
    schema: schemas,
  }, null, 2);
  const data = [
    disclaimer,
    `export default ${body}`,
  ].join('\n\n');

  fs.writeFileSync(`${fileDirectory}/${fileName}`, data);
}

function createEntryPoint() {
  const schemaNames = getSchemas();
  const exportItems = [];
  const imports = schemaNames.map(fName => {
    const number = /(\d+)-/.exec(fName)[1];
    const importName = `schema${number}`;
    exportItems.push(importName);
    return `import ${importName} from './${fName}';`;
  })

  const footer = exportItems.map(item => `  ${item},`).join('\n');

  const data = [
    disclaimer,
    ...imports,
    '',
    'export default [',
    footer,
    '];\n',
  ].join('\n');

  fs.writeFileSync(`${fileDirectory}/index.js`, data);
}

/**
 * Migration file will be created if it doesn`t exist yet
 * It will just create the file, the implementation is up to the developer
 */
function createMigrationFiles() {
  const schemaNames = getSchemas();
  const migrationTemplate = [
    'export default function(oldRealm, newRealm) {',
    '  // migration code ',
    '}',
  ].join('\n');

  const imports = [];
  const exportItems = [];

  schemaNames.map((fName, idx) => {
    const filePath = path.resolve(__dirname, '../db/migrations', `${fName}-migration.js`);
    const version = /(\d+)-/.exec(fName)[1];
    imports.push(`import migration${idx + 1} from './${fName}-migration';`);
    exportItems.push(`  [${version}]: migration${idx + 1},`);

    if (fs.existsSync(filePath)) {
      return;
    }

    fs.writeFileSync(filePath, migrationTemplate);
  });

  const indexData = [
    ...imports,
    '',
    'export default {',
    ...exportItems,
    '};',
    '',
  ].join('\n');

  const indexPath = path.resolve(__dirname, '../db/migrations', 'index.js');
  fs.writeFileSync(indexPath, indexData);
}

createSchemaSnapshot();
createEntryPoint();
createMigrationFiles();





