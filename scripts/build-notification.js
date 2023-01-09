const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(process.argv).argv
const axios = require('axios').default;
const token = argv.token;
const moment = require('moment');

const WEBHOOK_URL = `https://mattermost.kyc-chain.com/hooks/${token}`;
const childProcess = require('child_process');

function getCommandOutput(command) {
  return childProcess.execSync(command).toString().trim()
}

const commitHash = getCommandOutput('git rev-parse HEAD');
const commitAuthor = getCommandOutput('git log -1 --pretty=%an');
const branchName = argv.branchName || getCommandOutput('git branch');
const commitMessage = argv.commitMessage || getCommandOutput('git show -s --format=%B');

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
const commitDate = new Date(getCommandOutput('git show -s --format=%ci'));
const formattedDate = moment(commitDate).format('YYYY-MM-DD_HHMMss')
const artifactsUrl = !isMobileDeploy && `https://console.cloud.google.com/storage/browser/sk-builds/unified-wallet/${formattedDate};tab=objects?project=selfkey2&prefix=&forceOnObjectsSortingFiltering=false`;
const appVersion = isMobileDeploy && 'v1.0.0 build(144)';
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
    }, appVersion && {
      title: 'App Version',
      value: appVersion,
      short: true,
    }, artifactsUrl && {
      title: '🗂️ Build files',
      value: `[click here to download](${artifactsUrl})`,
      short: true,
    }].filter(item => !!item)
  }],
};


console.log(JSON.stringify(data));


axios.post(WEBHOOK_URL, data);
