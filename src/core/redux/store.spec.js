import React from 'react';
import { createEnhancedStore, createStoreProvider } from './store';
import { createReducer, addReducer } from './reducers';
import { mount } from 'enzyme';
import { connect } from './index';

describe('Redux core: store', () => {
  let reducers;

  beforeEach(() => {
    reducers = {
      'test': jest.fn((state) => state),
    };
    const reducer = createReducer({}, reducers);
    addReducer('wallet', reducer);
  });

  it('expect to call reducer', () => {
    const store = createEnhancedStore();
    store.dispatch({ type: 'test' });
    expect(reducers.test).toBeCalled();
  });

  it('expect to call reducer using Provider', () => {
    const Provider = createStoreProvider();
    let appProps;

    const App = function(props) {
      appProps = props;
      return null;
    };

    const mapStateToProps = state => {
      return {

      };
    };

    const mapActionToProps = dispatch => {
      return {
        action: () => dispatch({ type: 'test' }),
      };
    };

    const ConnectedApp = connect(mapStateToProps, mapActionToProps)(App);

    const wrapper = mount(
      <Provider>
        <ConnectedApp />
      </Provider>
    );

    expect(appProps).toBeDefined();

    appProps.action();

    expect(reducers.test).toBeCalled();
  });
});
