import * as actionTypes from '../Actions/actionTypes'

const initialState = {

}

const commonReducer = (state = initialState, action) => {

    if (action.type === actionTypes.TextAlert) {
        return {
            ...state,
            textalert: action.alert,
        }
    }
   
    
    return state;
};

export default commonReducer;