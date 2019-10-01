// @flow
import React, { useEffect } from 'react';
import Navigation from './navigation';
import { connect } from '@selfkey/wallet-core/redux';
import modules from '@selfkey/wallet-core/modules';
import { LoadingScreen } from './screens/loading-screen';

type AppProps = {
  isLoading: boolean,
  loadApp: () => any,
};

export function App(props: AppProps) {
  const { isLoading, loadApp } = props;

  useEffect(() => {
    loadApp();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Navigation />;
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
