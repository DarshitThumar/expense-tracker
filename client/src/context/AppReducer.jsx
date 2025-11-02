// A reducer specifies how the application's state changes in response to actions.
const AppReducer = (state, action) => {
    switch (action.type) {
      case 'GET_TRANSACTIONS':
        return {
          ...state,
          loading: false,
          transactions: action.payload,
        };
      case 'ADD_TRANSACTION':
        return {
          ...state,
          transactions: [action.payload, ...state.transactions],
        };
      case 'UPDATE_TRANSACTION':
        return {
          ...state,
          transactions: state.transactions.map((transaction) =>
            transaction._id === action.payload._id ? action.payload : transaction
          ),
        };
      case 'DELETE_TRANSACTION':
        return {
          ...state,
          transactions: state.transactions.filter(
            (transaction) => transaction._id !== action.payload
          ),
        };
      case 'TRANSACTION_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default AppReducer;
