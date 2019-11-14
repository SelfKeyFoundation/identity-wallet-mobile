// @flow
import React, { useEffect } from 'react';
import { NavigationContainer } from './navigation';
import { connect } from '@selfkey/wallet-core/redux';
import modules from '@selfkey/wallet-core/modules';

type AppProps = {
  isLoading: boolean,
  loadApp: () => any,
};

export function App(props: AppProps) {
  const { loadApp } = props;

  useEffect(() => {
    loadApp();
  }, []);

  return (
    <NavigationContainer />
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
