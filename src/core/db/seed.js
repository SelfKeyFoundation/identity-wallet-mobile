import { TokenModel, RepositoryModel } from '../models';
import tokensData from '../assets/data/eth-tokens.json';

async function loadTokens() {
  // check if tokens are already loaded
  const model = TokenModel.getInstance();
  const items = model.findAll();
  if (items.length < 10) {
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
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      })
    } catch(err) {
      // console.error(err);
    }
  });

  await Promise.all(operation);
}

async function loadIdentity() {
  const repoModel = RepositoryModel.getInstance();
  const foundItems = await repoModel.findAll();

  if (foundItems.length) {
    return;
  }

  await repoModel.create({
    id: repoModel.generateId(),
    url: 'http://platform.selfkey.org/repository.json',
		name: 'Selfkey.org',
		eager: true,
		content: {},
		expires: 0,
  });
}

export async function seedDb() {
  await loadTokens();
  await loadIdentity();
}