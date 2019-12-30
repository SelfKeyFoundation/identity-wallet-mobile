import { initDatabase } from './test-setup';

beforeAll(async () => {
  jest.setTimeout(300000);
  await initDatabase();
});


