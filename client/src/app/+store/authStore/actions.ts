import { createAction, props } from '@ngrx/store';
import { IComment } from 'src/app/shared/interfaces';

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


//comments
export const addComment = '[Auth] Add Comment';
export const clearComment = '[Auth] Clear Comment';

export const add_comment = createAction(addComment, props<commentProps>());
export const clear_comment = createAction(clearComment);


export type commentProps = { comments: IComment[] };
