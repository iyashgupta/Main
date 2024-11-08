const mongoose = require('mongoose');

// Function to establish a connection to MongoDB
const connection = mongoose.connect('mongodb://127.0.0.1:27017/StudentManagementDB')
  
module.exports = {
  connection
};
