import migration1 from './1-init-migration';
import migration2 from './2-wallet-updates-migration';
import migration3 from './3-wallet-updates-2-migration';
import migration4 from './4-4-token-updates-migration';
import migration5 from './5-5-token-updates-migration';

export default {
  [1]: migration1,
  [2]: migration2,
  [3]: migration3,
  [4]: migration4,
  [5]: migration5,
};
