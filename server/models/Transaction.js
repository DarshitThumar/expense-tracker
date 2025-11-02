const mongoose = require('mongoose');

// Define the structure of a transaction in the database
const TransactionSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: [true, 'Please add a description'],
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
  },
  type: {
    type: String,
    enum: ['income', 'expense'], // Amount can only be one of these two
    required: [true, 'Please specify the type'],
  },
  category: {
    type: String,
    trim: true,
    default: 'General',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
module.exports = mongoose.model('Transaction', TransactionSchema);