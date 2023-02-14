const db = require('./connection');
const seedData = require('./dataSeed.json');
const { Record } = require('../models');

db.once('open', async () => {
  try {
    await Record.deleteMany({});
    await Record.create(seedData);
    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
