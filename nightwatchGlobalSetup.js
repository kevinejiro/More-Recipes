const chromedriver = require('chromedriver');

module.exports = {
  default: {
    before: (done) => {
      chromedriver.start();
      done();
    },
    after: (done) => {
      chromedriver.stop();
      done();
    }
  }
};
