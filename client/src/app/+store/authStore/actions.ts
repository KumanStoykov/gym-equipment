import { createAction, props } from '@ngrx/store';


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

