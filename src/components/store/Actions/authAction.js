import * as actionTypes from './actionTypes'

export const login = (user) => {
    return {
        type: actionTypes.Login,
        user:user  
    };
};

export const logout = () => {
    return {
        type: actionTypes.Logout
    };
};

export const showAuth = () => {
    return {
        type: actionTypes.ShowAuth
    };
};
