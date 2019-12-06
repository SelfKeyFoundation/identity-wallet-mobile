import { TokenModel } from '../models';
import tokensData from '../assets/data/eth-tokens.json';

async function loadTokens() {
  // check if tokens are already loaded
  const model = TokenModel.getInstance();

  if (model.findAll().length === tokensData.length) {
    return;
  }

  const operation = tokensData.map(async (data, idx) => {
    try {
      await model.create({
        id: idx + 1,
        decimal: data.decimal,
        address: data.address,
        icon: null,
        isCustom: false,
        symbol: data.symbol,
        createdAt: new Date(),
        updatedAt: new Date(), 
      })
    } catch(err) {
      // console.error(err);
    }
  });

  await Promise.all(operation);
}

export async function seedDb() {
  await loadTokens();
}