import * as actionTypes from '../Actions/actionTypes'

const initialState = {
    isShowAuth: false,
    isLogin: false,
    user:[]
}

const authReducer = (state = initialState, action) => {

    if (action.type === actionTypes.Login) {
        return {
            ...state,
            isLogin: action.access_token!==''?true:false,
            isShowAuth: false,
            user:action.user 
        }
    }
    if (action.type === actionTypes.Logout) {
        return {
            ...state,
            isLogin: false,
            isShowAuth: true,
            user:[]
        }
    }
    if (action.type === actionTypes.ShowAuth) {

        return {
             ...state,
             isLogin: false,
            isShowAuth: true
        }
    }
    return state;
};

export default authReducer;