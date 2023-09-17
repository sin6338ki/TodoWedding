const SET_TOKEN = "set_token";
const DELETE_TOKEN = "delete_token";

const AuthInitialState = {
    token: null,
    userSeq: null,
};

export const setToken = (token) => ({
    type: SET_TOKEN,
    token,
});

export const deleteToken = (token) => ({
    type: DELETE_TOKEN,
    token,
});

export const AuthReducer = (state = AuthInitialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token,
            };
        case DELETE_TOKEN:
            return {
                ...state,
                token: null,
            };
        default:
            return state;
    }
};
