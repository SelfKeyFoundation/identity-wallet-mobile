# cp -rf ./node_modules/@react-native-community/* ./packages/identity-wallet-mobile/node_modules/@react-native-community
# cp -rf ./node_modules/@react-native-community ./packages/identity-wallet-mobile/node_modules/
# cp -rf ./node_modules/react-native ./packages/identity-wallet-mobile/node_modules/
# cp -rf ./node_modules/react-native-splash-screen ./packages/identity-wallet-mobile/node_modules/
# cp -rf ./node_modules/realm ./packages/identity-wallet-mobile/node_modules/

# cp -rf ./node_modules/react-native-reanimated ./packages/identity-wallet-mobile/node_modules/react-native-reanimated
sed -i".bkp" -e "s/ existingModule \&\&/false \&\&/g" ./node_modules/jest-haste-map/build/index.js
sed -i".bkp" -e "s/ existingModule \&\&/false \&\&/g" ./packages/identity-wallet-mobile/node_modules/jest-haste-map/build/index.js
