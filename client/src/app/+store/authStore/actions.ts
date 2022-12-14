import { createAction, props } from '@ngrx/store';

//user
export const authSuccess = '[Auth] Auth Success';

export const authFail = '[Auth] Auth Fail';

export const auth_success = createAction(authSuccess, props<authSuccess>());

export const auth_fail = createAction(authFail);

export const auth_logout = createAction(authFail);

export type authSuccess = {
    _id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    isAdmin: boolean;
};

//message
export const addMessage = '[Auth] Add Message';
export const clearMessage = '[Auth] Clear Message';

export const add_message = createAction(addMessage, props<messageProps>());
export const clear_message = createAction(clearMessage);


export type messageProps = { text: string, typeMsg: string, product?: string, _id?: string };
