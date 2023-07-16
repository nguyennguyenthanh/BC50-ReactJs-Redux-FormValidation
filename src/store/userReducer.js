import { DELETE_USER, EDIT_USER, SUBMIT_USER, GET_KEYWORD } from './constants';
const stateUser = {
    listUser: [
        {
            id: 1,
            fullname: "Dinh Phuc Nguyen",
            username: "dpnguyen",
            email: "dpnguyen@gmail.com",
            phoneNumber: "123456789",
            type: "VIP"
        },
        {
            id: 2,
            fullname: "Nguyen Van A",
            username: "vana",
            email: "vana@gmail.com",
            phoneNumber: "123456789",
            type: "USER"
        }
    ],
    userEdit: null,
    keyword: "",
}

const userReducer = (state = stateUser, action) => {
    switch (action.type) {
        case DELETE_USER: {
            let listUserClone = [...state.listUser];
            let index = listUserClone.findIndex(user => user.id === action.payload);
            if (index !== -1) {
                listUserClone.splice(index, 1);
                state.listUser = listUserClone;
            }
            return { ...state };
        }
        case GET_KEYWORD: {
            state.keyword = action.payload;
            return { ...state };
        }
        case SUBMIT_USER: {
            const user = action.payload;
            let listUserClone = [...state.listUser];
            if (user.id) {
                //update
                const index = listUserClone.findIndex(item => item.id === user.id);
                if (index !== -1) {
                    listUserClone[index] = user;
                }
            } else {
                //add
                let userCLone = { ...user, id: new Date().getTime() };
                listUserClone.push(userCLone);
            }
            state.listUser = listUserClone;
            return { ...state };
        }
        case EDIT_USER: {
            state.userEdit = action.payload;
            return { ...state };
        }
        default:
            return { ...state };
    }
}
export default userReducer;