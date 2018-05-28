import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

// 返回的一个汇总的函数
const rootReducer = combineReducers({
  form: formReducer
});

export default rootReducer;
