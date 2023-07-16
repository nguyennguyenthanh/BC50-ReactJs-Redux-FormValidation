import { DELETE_USER, EDIT_USER, SUBMIT_USER, GET_KEYWORD } from './constants';

export const actDeleteUser = (id) => {
    return {
        type: DELETE_USER,
        payload: id,
    }
}

export const actEditUser = (user) => {
    return {
        type: EDIT_USER,
        payload: user,
    };
}
export const actSubmitUser = (user) => {
    return {
        type: SUBMIT_USER,
        payload: user,
    }
}
export const actSearchUser = (keyword) => {
    return {
        type: GET_KEYWORD,
        payload: keyword,
    }
}