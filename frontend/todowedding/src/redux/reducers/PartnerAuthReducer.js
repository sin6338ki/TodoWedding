const SET_PARTNER_AUTH = "set_partner_auth";
const DELETE_PARTNER_AUTH = "delete_partner_auth";

const AuthInitialState = {
    partnerAuth: null,
};

export const setPartnerAuth = (partnerAuth) => ({
    type: SET_PARTNER_AUTH,
    partnerAuth,
});

export const deletePartnerAuth = (partnerAuth) => ({
    type: DELETE_PARTNER_AUTH,
    partnerAuth,
});

export const PartnerAuthReducer = (state = AuthInitialState, action) => {
    switch (action.type) {
        case SET_PARTNER_AUTH:
            return {
                ...state,
                partnerAuth: action.partnerAuth,
            };
        case DELETE_PARTNER_AUTH:
            return {
                ...state,
                partnerAuth: null,
            };
        default:
            return state;
    }
};
