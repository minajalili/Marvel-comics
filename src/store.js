import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import authReducer from './components/store/Reducers/authReducer'
import commomReducer from './components/store/Reducers/commonReducer'


const reducer = combineReducers({
    auth: authReducer,
    common: commomReducer

})

const middleWare = [thunk]

const store = createStore(reducer, applyMiddleware(...middleWare))

export default store;