// const { file1 } = require("../kyc-test");
// const { Identity } = require("./modules/kyc/identity");
// const { getDevRPDetails } = require("./modules/kyc/operations");
// const { fetchAsJson, default: RelyingPartySession, getDocumentFormData } = require("./modules/kyc/relying-party");

// const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36';
// const DEFAULT_ORIGIN = 'IDW';

// const wallet = {
//   // android
//   address: '0x0e1456b58773A651A9E9bF644f239Ae6C58dC2f7',
//   vaultId: '21f87c4947be2aaae05043a0f43b198332267d140ecd1ba17903a9cd399a20a5',
//   // ios
//   // address: '0x646aFd5b6dA8D0100863a9BF0739B3d9d7E2ed78',
//   // vaultId: '6208b3928397d9b5922ee318233aade496957bf535d14785a16748b43858ac39',
// };




// const identity = {
  
// };

// async function main() {
//   const config = getDevRPDetails().relyingPartyConfig;
//   const identityData = await Identity.create(wallet, identity);
//   const session = new RelyingPartySession(config, identityData);
//   await session.establish();

//   // debugger;

//   // let xhr = new XMLHttpRequest();
//   // xhr.open('POST', 'https://dev.instance.kyc-chain.com/api/v2/files');
//   // // xhr.open('POST', 'https://mzm-test.free.beeceptor.com/file');
//   // let formdata = new FormData();
//   // // image from CameraRoll.getPhotos(
//   // formdata.append('document', {...image, name: 'image.jpg', type: 'image/jpeg'});
  
//   // xhr.
  
//   // xhr.setRequestHeader('Authorization', `Bearer ${session.ctx.token}`);
//   // const formData = getDocumentFormData(
//   //   {
//   //     document: {
//   //       ...file1.document,
//   //       value: "file:///data/user/0/com.identitywalletmobile/files/document-1a56324d-8545-493d-bde8-a028fd1efacf.PNG",
//   //     },
//   //   },
//   // );
  
//   // debugger;
//   // xhr.onreadystatechange = (ev) => {
//   //   if(xhr.readyState === XMLHttpRequest.DONE) {
//   //     var status = xhr.status;
//   //     if (status === 0 || (status >= 200 && status < 400)) {
//   //       // The request has been completed successfully
//   //       console.log(xhr.responseText);
//   //       debugger;
//   //     } else {
//   //       debugger;
        
//   //       // Oh no! There has been an error with the request!
//   //     }
//   //   }
//   // }
  
//   // xhr.send(formData);
  

//   const res = await fetchAsJson('https://dev.instance.kyc-chain.com/api/v2/files', {
//     method: 'POST',
//     formData: {
//       document: {
//         ...file1.document,
//         value: "file:///data/user/0/com.identitywalletmobile/files/document-1a56324d-8545-493d-bde8-a028fd1efacf.PNG",
//       },
//     },
//     headers: {
//       Authorization: `Bearer ${session.ctx.token}`,
//       'User-Agent': userAgent,
//       Origin: 'IDW',
//       // 'Accept': 'application/json',
//       // 'Content-Type': 'multipart/form-data',
//     },
//   });
  
//   debugger;
// }

// // main();
