sed -i".bkp" -e "s/ existingModule \&\&/false \&\&/g" ./node_modules/jest-haste-map/build/index.js
sed -i".bkp" -e "s/ existingModule \&\&/false \&\&/g" ./packages/identity-wallet-mobile/node_modules/jest-haste-map/build/index.js
sed -i".bkp" -e "s/ existingModule \&\&/false \&\&/g" ./packages/mobile-ui-storybook/node_modules/jest-haste-map/build/index.js

# Fix for dupilcated react versions
# Multiple react versions could be placed in different packages due to third party libs
# It will remove them and rely just in the root react
rm -rf ./packages/**/node_modules/react
rm -rf ./packages/**/node_modules/react-redux
rm -rf ./packages/**/node_modules/styled-components
rm -rf ./packages/**/node_modules/ethereumjs-util
rm -rf ./packages/**/node_modules/keccak
