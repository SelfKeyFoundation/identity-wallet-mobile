cp -rf ./node_modules/@react-native-community/* ./packages/identity-wallet-mobile/node_modules/@react-native-community
cp -rf ./node_modules/react-native-reanimated ./packages/identity-wallet-mobile/node_modules/react-native-reanimated
sed -i".bkp" -e "s/ existingModule \&\&/false \&\&/g" ./node_modules/jest-haste-map/build/index.js