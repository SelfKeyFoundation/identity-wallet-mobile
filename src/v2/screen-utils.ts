


export function getNavigationParam(screenProps: any, paramId: string, defaultValue: any) {
    return screenProps.route.params?.paramId || defaultValue;
}