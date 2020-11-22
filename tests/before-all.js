import { initDatabase } from './setup-app';

const sleep = (time) => new Promise(res => setTimeout(res, time));

beforeAll(async () => {
  jest.setTimeout(300000);
  await initDatabase();
});
