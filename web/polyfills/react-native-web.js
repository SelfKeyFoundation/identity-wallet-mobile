export * from 'react-native-web';

import {Text} from 'react-native-web';

Text.propTypes = {
    style: {}
}

const ViewPropTypes = {
    style: {},
};

const NativeModules = {
    RNPermissions: {

    },
    RNFSManager: {
        
    }
}

const StyleSheet = {
    create: (item) => item,
}

const Platform = {
    select: (opts) => opts.web,
}

const ToolbarAndroid = function() {
    return null;
}


export {
    ViewPropTypes,
    NativeModules,
    StyleSheet,
    Platform,
    ToolbarAndroid,
};
