import React from 'react';
import {ScrollView as NBScrollView} from 'native-base';

export const ScrollView = function(props) {
    return <NBScrollView id="scroll-view" style={{ overflow: 'scroll', ...props?.style }} {...props} />
};
