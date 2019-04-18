module.exports = {
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    dumpio: false, // Hide default browser process stdout
    headless: true,
  },
  server: {
    command: 'yarn start:prod',
    port: 9000,
    launchTimeout: 30000,
    debug: false,
  },
};
