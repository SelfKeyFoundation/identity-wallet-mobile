# Release for iOS

You need follow these steps:

## Configure build schema

1. Open the project in xcode
2. Go to Product->Scheme->Edit Schema
3. In the 'Build configuration' select the option 'Release'
4. Now you can build the project for release

## Build for release

You can do it in xcode or by using react-native cli.

- To do it using xcode you need to go to Product->Build
- To performn the action with react-native cli you need to run `react-native run-ios --configuration Release``

## Getting the artifacts

The release files will be placed on this folder:

./packages/identity-wallet-mobile/ios/build/IdentityWalletMobile/Build/Products/Release-iphonesimulator
