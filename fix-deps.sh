# sed -i".bkp" -e "s/react-native-tcp\"/react-native-tcp-socket\"/g" ./package.json
# Should not commit it
# rm -rf  ./node_modules/@rjsf/core/lib
# cp -rf ../react-jsonschema-form/src ./node_modules/@rjsf/core/lib

# rm -rf ./node_modules/react-native-svg-flagkit/node_modules/react-native-svg/
sed -i -e "s/global\.\"v14\.17\.6\"/global[\"v14.17.6\"]/g" ./node_modules/pbkdf2/lib/default-encoding.js
