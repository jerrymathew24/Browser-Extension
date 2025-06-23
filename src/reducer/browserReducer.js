export const browserReducer = (state, {type, payload}) => {
    switch(type){
        case "SET_NAME":
            return {
                ...state,
                name: payload
            }
        case "SET_TIME":
            return{
                ...state,
                time: payload
            }
        case "SET_MESSAGE":
            return {
                ...state,
                message: payload >= 0 &&  payload < 12 ? "Good Morning" : payload >=12 && payload <=17 ? "Good Afternoon"  : "Good Evening"
            }
        case "SET_TASK":
            return {
                ...state,
                task: payload
            }
        case "REMOVE_TASK":
            return {
                ...state,
                task: null
            }
        default:
            return state;
    }
}