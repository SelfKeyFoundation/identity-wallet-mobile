// import { createStackNavigator } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation';
import { Routes } from 'core/navigation';
import { AppTabBar } from '../../components/AppTabBar';
import SettingsScreen from '../../screens/SettingsScreen';
import DashboardScreen from '../../screens/DashboardScreen';
import ReceiveTokensScreen from '../../screens/ReceiveTokensScreen';
import SendTokensScreen from '../../screens/SendTokensScreen';
import MyTokensScreen from '../../screens/MyTokensScreen';
import ScanQRScreen from '../../screens/ScanQRScreen';
import CreateBackupScreen from '../../screens/CreateBackupScreen';
import CustomTokensScreen from '../../screens/CustomTokensScreen';
import TokenDetailsScreen from '../../screens/TokenDetailsScreen';
import CreateNewPasswordScreen from '../../screens/CreateNewPasswordScreen';
import ConfirmNewPasswordScreen from '../../screens/ConfirmNewPasswordScreen';
import RecoveryInformationScreen from '../../screens/RecoveryInformationScreen';
import ChangePasswordScreen from '../../screens/ChangePasswordScreen';
import DevSettingsScreen from '../../screens/DevSettingsScreen';
import MyProfileScreen from '../../screens/MyProfileScreen';
// import DocumentScannerScreen from '../../screens/DocumentScannerScreen';
// import LearnHowToStakeScreen from '../../screens/LearnHowToStakeScreen';
// import { AssociateDIDScreen } from '../../screens/AssociateDIDScreen';
// import { RegisterDIDScreen } from '../../screens/RegisterDIDScreen';
// import StakingDashboardScreen from '../../screens/StakingDashboardScreen';
// import CredentialsDashboardScreen from '../../screens/CredentialsDashboardScreen';
// import KeyFiEligibilityStartScreen from '../../screens/KeyFiEligibilityStartScreen'
// import { stackNavigatorConfig } from '../configs';
import MarketplaceCategoriesScreen from 'screens/marketplaces/MarketplaceCategoriesScreen';
import MarketplaceProductListingScreen from 'screens/marketplaces/MarketplaceProductListingScreen';
// import MarketplaceProductScreen from 'screens/marketplaces/MarketplaceProductScreen';
// import { WalletConnectScreen } from 'screens/walletConnect/WalletConnectScreen';
// import { SKAgentScreen } from 'features/selfkey-agent/SKAgentScreen';

export const appTabNavigation = {
  // [Routes.APP_RECEIVE_TOKENS]: ReceiveTokensScreen,
  // [Routes.APP_SEND_TOKENS]: SendTokensScreen,
  // 
  // [Routes.APP_SCAN_QR]: ScanQRScreen,
  // [Routes.APP_MY_TOKENS]: MyTokensScreen,
  // [Routes.APP_MY_PROFILE]: MyProfileScreen,
};

export const appFlow = {
  // [Routes.APP_TAB_NAVIGATION]: appTabNavigation,
  [Routes.APP_DASHBOARD]: DashboardScreen,
  [Routes.TOKEN_DETAILS]: TokenDetailsScreen,
  [Routes.CUSTOM_TOKENS]: CustomTokensScreen,
  [Routes.SCAN_QR]: ScanQRScreen,
  [Routes.CREATE_BACKUP]: CreateBackupScreen,
  [Routes.WALLET_NEW_PASSWORD]: CreateNewPasswordScreen,
  [Routes.WALLET_CONFIRM_NEW_PASSWORD]: ConfirmNewPasswordScreen,
  [Routes.RECOVERY_INFORMATION]: RecoveryInformationScreen,
  [Routes.DEVELOPER_SETTINGS]: DevSettingsScreen,
  [Routes.APP_MY_TOKENS]: MyTokensScreen,
  [Routes.APP_MY_PROFILE]: MyProfileScreen,
  [Routes.APP_SETTINGS]: SettingsScreen,
  [Routes.MARKETPLACE_CATEGORIES]: MarketplaceCategoriesScreen,

  // [Routes.DOCUMENT_SCANNER]: DocumentScannerScreen,
  [Routes.CHANGE_PASSWORD]: ChangePasswordScreen,
  // [Routes.ASSOCIATE_DID]: AssociateDIDScreen,
  // [Routes.REGISTER_DID]: RegisterDIDScreen,
  // [Routes.LEARN_HOW_TO_STAKE]: LearnHowToStakeScreen,
  // [Routes.KEYFI_ELIGIBILITY_START]: KeyFiEligibilityStartScreen,
  // [Routes.MARKETPLACE_PRODUCT]: MarketplaceProductScreen,
  [Routes.MARKETPLACE_PRODUCT_LISTING]: MarketplaceProductListingScreen,
  // [Routes.WALLET_CONNECT]: WalletConnectScreen,
  // [Routes.SK_AGENT]: SKAgentScreen,
  // We might use other flows inside of app where the tabs will not be visible
  // these flows can be placed here
};
