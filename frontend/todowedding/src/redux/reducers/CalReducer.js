const SET_SCHEDULD = "set_schedule";
const DELETE_SCHEDULD = "delete_schedule";

const AuthInitialState = {
    schedule: null,
};

export const setSchedule = (schedule) => ({
    type: SET_SCHEDULD,
    schedule,
});

export const deleteToken = (schedule) => ({
    type: DELETE_SCHEDULD,
    schedule,
});

export const CalReducer = (state = AuthInitialState, action) => {
    switch (action.type) {
        case SET_SCHEDULD:
            return {
                ...state,
                schedule: action.schedule,
            };
        case DELETE_SCHEDULD:
            return {
                ...state,
                schedule: null,
            };
        default:
            return state;
    }
};
