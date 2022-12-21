const childProcess = require('child_process');
const moment = require('moment');
const glob = require('glob');

function getCommandOutput(command) {
  return childProcess.execSync(command).toString().trim()
}


const commitDate = new Date(getCommandOutput('git show -s --format=%ci'));
const formattedDate = moment(commitDate).format('YYYY-MM-DD_HHMMss')
const bucketFolder = `gs://sk-builds/unified-wallet/${formattedDate}/`;

console.log(`Uploading artifacts to: ${bucketFolder}`);

glob.sync('./out/**/*').forEach(f => console.log(f));

glob.sync('./out/**/*.zip').forEach(file => {
  console.log(`File: ${file}`);

  getCommandOutput(`gsutil cp ${file} ${bucketFolder}`)
});
