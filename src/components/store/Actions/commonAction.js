import * as actionTypes from './actionTypes'


export const textAlert = (alert) => {
    return {
        type: actionTypes.TextAlert,
        alert:alert
    };
};
