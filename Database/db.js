const mongoose = require('mongoose');

const mongooseConnect = async (req, res) => {
  try {
    let database = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDb Connected : ${database.connection.host}`);
  } catch (error) {
    console.log(`MongoDb Connection Failure: ${error}`);
    process.exit();
  }
};

module.exports = mongooseConnect;
