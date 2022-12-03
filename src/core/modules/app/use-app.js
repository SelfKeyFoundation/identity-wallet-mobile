import { useDispatch } from "react-redux";
import { navigate, Routes } from "../../navigation";
import appOperations from "./operations";
import { testWalletSetup } from "./test-app";

export function useApp() {
  const dispatch = useDispatch();

  const loadAndRedirect = async () => {
    // await testWalletSetup({ dispatch });
    await dispatch(appOperations.loadAppOperation());

    // return;
    // TODO: load wallets here
    // const wallets = [];

    // if (wallets.length === 1) {
    //   navigate(Routes.UNLOCK_WALLET_PASSWORD);
    // } else if (wallets.length > 1) {
    //   navigate(Routes.WALLET_SELECTION, {
    //     isUnlockScreen: true,
    //   });
    // } else {
    //   navigate(Routes.CREATE_WALLET_PASSWORD);
    // }

    // navigate(Routes.CREATE_WALLET_BACKUP)
  }

  return {
    loadAndRedirect
  }
}