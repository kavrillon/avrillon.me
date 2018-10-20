module.exports = {
  launch: {
    dumpio: true,
    headless: true
  },
  server: {
    command: "yarn start:prod",
    port: 9000,
    launchTimeout: 30000,
    debug: false
  }
};
