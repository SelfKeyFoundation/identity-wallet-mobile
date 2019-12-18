// @flow
import React, { useEffect } from 'react';
import { NavigationContainer } from './navigation';
import { connect } from '@selfkey/wallet-core/redux';
import modules from '@selfkey/wallet-core/modules';
import TermsOfServiceScreen from './screens/TermsOfServiceScreen';

type AppProps = {
  isLoading: boolean,
  loadApp: () => any,
};

export function App(props: AppProps) {
  const { loadApp, isLoading } = props;

  useEffect(() => {
    loadApp();
  }, []);

  return (
    <React.Fragment>
      <NavigationContainer />
      {
        !isLoading && (
          <TermsOfServiceScreen />
        )
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return ({
    isLoading: state.app.isLoading,
  });
};

const mapActionsToProps = (dispatch) => ({
  loadApp: () => dispatch(modules.app.operations.loadAppOperation()),
});

export default connect(mapStateToProps, mapActionsToProps)(App);
