module.exports = {
  launch: {
    headless: true
  },
  server: {
    command: "yarn start:prod",
    port: 9000,
    launchTimeout: 10000,
    debug: true
  }
};
