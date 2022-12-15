import { createAction, props } from '@ngrx/store';
import { IComment } from 'src/app/shared/interfaces';

//Auth
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

//wishlist

export const addToWishlist = '[Auth] Add to Wishlist';
export const removeFromWishlist = '[Auth] Remove from Wishlist';
export const autoLoadFromWishlist = '[Auth] Auto load from Wishlist';

export const add_wishlist = createAction(addToWishlist, props<wishlistProps>());
export const remove_wishlist = createAction(removeFromWishlist, props<wishlistProps>());
export const auto_load_wishlist = createAction(autoLoadFromWishlist, props<wishlistProps>());


export type wishlistProps = { _id: string, productType: string };
