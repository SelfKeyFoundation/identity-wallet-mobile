const childProcess = require('child_process');
const moment = require('moment');
const glob = require('glob');

function getCommandOutput(command) {
  return childProcess.execSync(command).toString().trim()
}


const commitDate = new Date(getCommandOutput('git show -s --format=%ci'));
const formattedDate = moment(commitDate).format('YYYY-MM-DD_HHMMss')


console.log(formattedDate);

glob.sync('./out/**/*.zip').forEach(file => {
  console.log(file);
});
// getCommandOutput(`gsutil cp`)
