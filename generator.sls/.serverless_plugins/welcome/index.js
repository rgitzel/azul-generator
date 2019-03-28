'use strict';

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      'before:deploy:deploy': this.failToDeploy.bind(this)
    };
  }

  failToDeploy() {
    this.serverless.cli.log(JSON.stringify(this.options));

          this.serverless.service.provider.shouldNotDeploy = true;

          const message = [
            'Service files not changed. Skipping deployment...',
          ].join('');
          this.serverless.cli.log(message);
  }
}

module.exports = ServerlessPlugin;
