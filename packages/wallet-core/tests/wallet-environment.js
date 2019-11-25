const NodeEnvironment = require('jest-environment-node');

class WalletEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();

    this.global.__realm__ = global.__realm__;
    this.global.__keychain__ = global.__keychain__;
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = WalletEnvironment;
