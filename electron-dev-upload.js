const childProcess = require('child_process');
const moment = require('moment');
const glob = require('glob');
const yargs = require('yargs/yargs')
const argv = yargs(process.argv).argv
const platform = argv.platform;

function getCommandOutput(command) {
  return childProcess.execSync(command).toString().trim()
}

if (!platform) {
  throw 'Platform is required';
}

const commitDate = new Date(getCommandOutput('git show -s --format=%ci'));
const formattedDate = moment(commitDate).format('YYYY-MM-DD_HHMMss')
const bucketFolder = `gs://sk-builds/unified-wallet/${formattedDate}`;

console.log(`Uploading [${platform}] artifacts to: ${bucketFolder}`);

glob.sync('./out/**/*.zip').forEach((file, idx) => {
  console.log('Uploading file...', file);
  getCommandOutput(`gsutil cp ${file} ${bucketFolder}/[Windows]Selfkey_Wallet.zip`)
});
