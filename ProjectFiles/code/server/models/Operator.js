const mongoose = require('mongoose');

const operatorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'operator' },
  approved: { type: Boolean, default: false } // ⬅️ Add this line
});

module.exports = mongoose.model('Operator', operatorSchema, 'operatorsdb');
