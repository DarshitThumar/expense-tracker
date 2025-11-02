const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

router.route('/').get(getTransactions); 
router.route('/').post(addTransaction); 
router.route('/:id').put(updateTransaction); 
router.route('/:id').delete(deleteTransaction); 

module.exports = router;