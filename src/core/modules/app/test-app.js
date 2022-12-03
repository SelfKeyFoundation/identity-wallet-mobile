import { navigate, Routes } from "../../navigation";
import { setupHDWallet } from "../create-wallet/create-wallet-utils";
import walletOperations from "../wallet/operations";

const mnemonic = 'rescue ivory series vital course oval stage employ uncover control avoid trust';


export async function testWalletSetup({ dispatch }) {
  const setupData = await setupHDWallet({
    mnemonic,
    password: 'test'
  })

  console.log('wallet created', { setupData });

  // await dispatch(walletOperations.loadWalletOperation(setupData));

  // setTimeout(() => {
  //   navigate(Routes.CREATE_WALLET_SETUP_COMPLETE);
  // }, 1000);
}