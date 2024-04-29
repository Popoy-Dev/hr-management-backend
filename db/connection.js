const mongoose = require('mongoose');




const connectDB = async (db) => {
  await mongoose.connect(db).then(() => console.log('Connected to the db')).catch((err) => console.log(err));
}

module.exports = connectDB



