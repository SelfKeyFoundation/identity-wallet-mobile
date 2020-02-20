import migration1 from './1-init-migration';
import migration2 from './2-wallet-updates-migration';

export default {
  [1]: migration1,
  [2]: migration2,
};
