module.exports = {
  apps: [
    {
      name: 'chat-backend',
      script: 'dist/main.js',
      // -i max => cluster mode using all CPU cores
      exec_mode: 'cluster',
      instances: 'max',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
