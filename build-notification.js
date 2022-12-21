const axios = require('axios').default;
// const WEBHOOK_URL = 'https://mzmtest.free.beeceptor.com/hooks/some-token';
const WEBHOOK_URL = 'https://mattermost.kyc-chain.com/hooks/u1f8jiyjrpdqfp3rznumcwshmh';
const childProcess = require('child_process');

function getCommandOutput(command) {
  return childProcess.execSync(command).toString().trim()
}

const commitHash = getCommandOutput('git rev-parse HEAD');
const commitAuthor = 'Maycon';

console.log(commitHash);

const isMobileDeploy = false;
const platformIcon = isMobileDeploy ? `📲` : `💻`;
const platformName = `Windows`;

const data = {
  username: 'Maycon',
  icon_emoji: '🚀',
  attachments: [{
    color: '#196cda',
    pretext: `Selfkey Wallet has been deployed`,
    // author_name: 'Maycon',
    fields: [{
      title: `${platformIcon} Platform`,
      value: `${platformName}`,
      short: true,
    }, {
      title: 'Commit message',
      value: 'fixing CI messages',
      short: true
    }, {
      title: 'Commit hash',
      value: '6d0eb3edbea20f274b9cb0728fb4e747944a96f8',
      short: true,
    }, {
      title: 'Branch',
      value: 'dev',
      short: true,
    }, {
      title: 'Build Number',
      value: '132',
      short: true,
    }, {
      title: '🗂️ Build files',
      value: '[click here to download](https://console.cloud.google.com/storage/browser/sk-builds/unified-wallet/2022-12-18-22_10?pageState=(%22StorageObjectListTable%22:(%22f%22:%22%255B%255D%22))&project=selfkey2&prefix=&forceOnObjectsSortingFiltering=false)',
      short: true,
    }]
    // text: `
    //     **Author**: \`Maycon\`\n
    //     **Purpose**: \`fixing CI messages\`\n
    //     **platform**: \`browser-extension\`\n
    //     **commit hash:** \`6d0eb3edbea20f274b9cb0728fb4e747944a96f8\`\n
    //     **branch**: \`dev\`\n
    //     **build artifacts**: [click here to download](https://console.cloud.google.com/storage/browser/sk-builds/unified-wallet/2022-12-18-22_10?pageState=(%22StorageObjectListTable%22:(%22f%22:%22%255B%255D%22))&project=selfkey2&prefix=&forceOnObjectsSortingFiltering=false)\n
    //     `
  }],
};


// console.log(data);
axios.post(WEBHOOK_URL, data);
