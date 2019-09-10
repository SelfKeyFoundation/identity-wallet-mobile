# Redux Modules
A module is defined by a couple of components

- myModule
  - actions
  - reducers
  - selectors
  - state
  - types

## State
Define the initial state for the reducers and side effects. 

It`s important to define the state type, so that it will be easier for other developers to understand what to return and which properties you should expect in any reducer.   
```
// @flow

export type WalletState = {
  isLoading: boolean
};


export const initialState: WalletState = {
  isLoading: false,
};
```

## Actions
In the actios file we must define the redux actions. We should also provide an action type for each action. So that we can predict the action payload when handling reducers and sagas

```
// @flow
import {
  LOAD_WALLET,
} from './types';

// action types
export type LoadWalletAction = {
  type: LOAD_WALLET,
};

// actions
export function loadWallet(): LoadWalletAction {
  return {
    type: LOAD_WALLET,
  };
}

```
## Reducers
On this file we must specify the reducers. Here we will take advantage of all the types definition created on actions and state definition. Also, to make it easier to handle reducers you can use the `createReducer` function as per example bellow.

```
// @flow
import { LOAD_WALLET } from './types';
import { LoadWalletAction } from './actions';
import { createReducer } from '../../redux/reducers';
import { initialState, WalletState } from './state';

export function loadWalletReducer(state: WalletState, action: LoadWalletAction): WalletState {
  return {
    ...state,
    isLoading: true,
  };
}

export const reducers = {
  [LOAD_WALLET]: loadWalletReducer,
};

export const walletReducer = createReducer(initialState, reducers);
```

## Types
Types for actions

```
// @flow

export const LOAD_WALLET = 'wallet/load';

```

## Sagas
To be defined. The desktop wallet is not using redux sagas. But for the mobile app it could be used in some cases.


