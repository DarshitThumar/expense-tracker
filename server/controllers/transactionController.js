const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/transactions
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Add a new transaction
// @route   POST /api/transactions
exports.addTransaction = async (req, res, next) => {
  try {
    let { description, amount, type, category, date } = req.body;

    if (type === 'expense' && Math.sign(amount) === 1) {
      amount = -amount;
    }
    if (type === 'income' && Math.sign(amount) === -1) {
        amount = Math.abs(amount);
    }

    const transaction = await Transaction.create({
        description,
        amount,
        type,
        category,
        date,
    });

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
exports.updateTransaction = async (req, res, next) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found',
      });
    }
    
    let { description, amount, type, category, date } = req.body;
    
    if (type === 'expense' && Math.sign(amount) === 1) {
      amount = -amount;
    }
    if (type === 'income' && Math.sign(amount) === -1) {
        amount = Math.abs(amount);
    }
    
    // Update the fields
    transaction.description = description || transaction.description;
    transaction.amount = amount || transaction.amount;
    transaction.type = type || transaction.type;
    transaction.category = category || transaction.category;
    transaction.date = date || transaction.date;

    await transaction.save();

    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found',
      });
    }

    await transaction.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};