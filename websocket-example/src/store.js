import {createStore} from 'redux';


const initialState = {
    messages: []
};


// Store
const store = createStore((state = initialState, action) => {
    switch(action.type){

        // Reducer
        case "ADD_NEW_MESSAGE": {
            state.messages.push({
                message: action.message,
                sender: action.sender,
                image: action.image
            });
            return Object.assign(state, {
                messages: state.messages
            })
        }
        //Reducer

        default: {
            return state;
        }
    }
});

export default store;