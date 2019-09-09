watchman watch-del-all
rm -rf $TMPDIR/metro-bundler-cache-*
rm -rf $TMPDIR/react-native-packager-cache-*
rm -rf $TMPDIR/haste-map-react-native-packager-*
rm -rf node_modules/st
rm -rf packages/*/node_modules

# yarn start --reset-cache