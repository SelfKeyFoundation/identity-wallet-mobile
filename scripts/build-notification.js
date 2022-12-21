const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(process.argv).argv
const axios = require('axios').default;
const token = argv.token;

const WEBHOOK_URL = `https://mattermost.kyc-chain.com/hooks/${token}`;
const childProcess = require('child_process');

function getCommandOutput(command) {
  return childProcess.execSync(command).toString().trim()
}

const commitHash = getCommandOutput('git rev-parse HEAD');
const commitAuthor = getCommandOutput('git log -1 --pretty=%an');
const branchName = getCommandOutput('git branch');
const commitMessage = getCommandOutput('git show -s --format=%B');

const nameMapping = {
  mzmsk: 'Maycon',
  'Maycon Mello': 'Maycon',
  'maycon-mello': 'Maycon',
}

const userName = nameMapping[commitAuthor] || commitAuthor;
const isMobileDeploy = argv.isMobile;
const platformIcon = isMobileDeploy ? `📲` : `💻`;
const platformName =  argv.platform;

const repositoryUrl = argv.repositoryUrl ? `${argv.repositoryUrl}/` : '';
const appName =  argv.appName || `Selfkey Wallet`;
const artifactsUrl = `https://console.cloud.google.com/storage/browser/sk-builds/unified-wallet/2022-12-18-22_10?pageState=(%22StorageObjectListTable%22:(%22f%22:%22%255B%255D%22))&project=selfkey2&prefix=&forceOnObjectsSortingFiltering=false`;
const buildNumber = null;//`123`;
const environmentName = 'Staging';

const data = {
  username: userName,
  icon_emoji: '🚀',
  attachments: [{
    color: '#196cda',
    pretext: `${appName} has been deployed`,
    fields: [{
      title: `${platformIcon} Platform`,
      value: `${platformName}`,
      short: true,
    }, {
      title: 'Commit message',
      value: `${commitMessage}`,
      short: true
    }, {
      title: 'Commit hash',
      value: `${repositoryUrl}${commitHash}`,
      short: true,
    }, environmentName && {
      title: 'Environment',
      value: `${environmentName}`,
      short: true,
    }, {
      title: 'Branch',
      value: `${branchName}`,
      short: true,
    }, buildNumber && {
      title: 'Build Number',
      value: buildNumber,
      short: true,
    }, artifactsUrl && {
      title: '🗂️ Build files',
      value: `[click here to download](${artifactsUrl})`,
      short: true,
    }]
  }],
};


// console.log(data);
axios.post(WEBHOOK_URL, data);
