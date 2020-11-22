import { createSlice } from '@reduxjs/toolkit'
import WalletConnect from '@walletconnect/client';

const initialState = {
  isLoading: true,
  connector: null,
  confirmConnection: {
    url: 'keyfi.com'
  },
  // confirmTransaction: {
  //   amount: '0.09',
  //   address: '0x10239120398120938098',
  //   fee: '0',
  //   data: 'some data',
  // },
};

const walletConnect = createSlice({
  name: 'walletConnect',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setConnector(state, action) {
      state.connector = action.payload;
    },
    setConfirmConnection(state, action) {
      state.confirmConnection = action.payload;
    },
    setConfirmTransaction(state, action) {
      state.confirmTransaction = action.payload;
    },
  }
});

export const walletConnectActions = walletConnect.actions;

const getRoot = state => state.walletConnect;

export const walletConnectSelectors = {
  getLoading: state => getRoot(state).isLoading,
  getConnector: state => getRoot(state).connector,
  getConfirmConnection: state => getRoot(state).confirmConnection,
  getConfirmTransaction: state => getRoot(state).confirmTransaction,
  
};

export const walletConnectOperations = {
  createConnection: (uri) =>  async (dispatch, getState) => {
    dispatch(walletConnectActions.setLoading(true));
    
    const connector = new WalletConnect(
      {
        // Required
        uri,
        // // Required
        // clientMeta: {
        // 	description: 'WalletConnect Developer App',
        // 	url: 'https://walletconnect.org',
        // 	icons: ['https://walletconnect.org/walletconnect-logo.png'],
        // 	name: 'WalletConnect',
        // },
      },
      // {
      // 	// Optional
      // 	url: 'https://push.walletconnect.org',
      // 	type: 'fcm',
      // 	token: '123123123sdfasdfasdf',
      // 	peerMeta: true,
      // 	// language: language,
      // },
    );

    await connector.createSession();

    dispatch(walletConnectActions.setConnector(connector)); 
    dispatch(walletConnectActions.setLoading(false)); 
  },
  confirmConnection: () => async (dispatch, getState) => {
    dispatch(walletConnectActions.setConfirmConnection(null));
  },
  rejectConnection: () => async (dispatch, getState) => {
    dispatch(walletConnectActions.setConfirmConnection(null));
  },
  confirmTransaction: () => async (dispatch, getState) => {
    dispatch(walletConnectActions.setConfirmTransaction(null));
  },
  rejectTransaction: () => async (dispatch, getState) => {
    dispatch(walletConnectActions.setConfirmTransaction(null));
  },
}

export const walletConnectReducer = walletConnect.reducer;


export default {
	reducer: walletConnectReducer,
	actions: walletConnectActions,
	operations: walletConnectOperations,
	selectors: walletConnectSelectors,
};
