

const state = {
  wallet: {
    address: string,
    balance: string,
    createdAt: date,
    id: number,
    name: string,
    privateKey: string,
    /**
     * local for non hardware wallets
     */
    profile: string,
  },
  tokens: {
    tokens: [
      address: string,
      balance: string,
      balanceInFiat: number,
      decimal: number,
      hidden: booleanLiteral,
      id: number,
      isCustom: boolean,
      price: 0,
      priceUSD: number,
      recordState: number,
      symbol: string, // KI
      tokenId: number,
      walletId: number  
    ]
  }
}

type Token = {
  id: number, // 2
  decimal: number, // 18
  address: string,
  icon: string,
  isCustom: boolean,
  symbol: 'KI', // string
  createdAt: Date,
  updatedAt: Date,
}

type WalletToken = {
  id: number,
  balance: string,
  balanceInFiat: number,
  hidden: booleanLiteral,
  price: 0,
  priceUSD: number,
  recordState: number,
  tokenId: number  
  // address: string,
  // decimal: number,
  // isCustom: boolean,
  // symbol: string, // KI
}

type Wallet = {
  address: string,
  balance: string,
  createdAt: date,
  id: number,
  name: string,
  privateKey: string,
  /**
   * local for non hardware wallets
   */
  profile: string,
  tokens: WalletToken,
}

const state = {
  wallet: {
    address: string,
    balance: string,
    createdAt: date,
    id: number,
    name: string,
    privateKey: string,
    /**
     * local for non hardware wallets
     */
    profile: string,
    tokens: []
  },
  tokens: {
    tokens: [
      address: string,
      balance: string,
      balanceInFiat: number,
      decimal: number,
      hidden: booleanLiteral,
      id: number,
      isCustom: boolean,
      price: 0,
      priceUSD: number,
      recordState: number,
      symbol: string, // KI
      tokenId: number,
      walletId: number  
    ]
  }
}
