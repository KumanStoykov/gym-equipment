import { createReducer, on, Action } from '@ngrx/store';

import { IUser } from '../shared/interfaces';

import * as AuthActions from './actions';

export interface IAuthState {
    user: IUser | null;
    message: AuthActions.messageProps | null;
    comments: AuthActions.commentProps | null;
    wishlist: AuthActions.wishlistProps[];
}

export const featureKey = 'auth';

const initialState: IAuthState = {
    user: null,
    message: null,
    comments: null,
    wishlist: [],
};


const _authReducer = createReducer(
    initialState,
    on(AuthActions.auth_success, (state, action) => {
        return {
            ...state,
            user: {
                _id: action._id,
                email: action.email,
                firstName: action.firstName,
                lastName: action.lastName,
                phone: action.phone,
                address: action.address,
                isAdmin: action.isAdmin
            }
        }
    }),
    on(AuthActions.auth_fail, (state) => {
        return{
            ...state,
            user: null
        }
    }),
    on(AuthActions.auth_logout, (state) => {
        return{
            ...state,
            user: null
        }
    }),
    on(AuthActions.add_message, (state, action) => {
        return {
            ...state,
            message: action
        }
    }),
    on(AuthActions.clear_message, (state) => {
        return {
            ...state,
            message: null
        }
    }),
    on(AuthActions.add_comment, (state, action) => {
        return {
            ...state,
            comments: action
        }
    }),
    on(AuthActions.clear_comment, (state) => {
        return {
            ...state,
            comments: null
        }
    }),
    on(AuthActions.add_wishlist, AuthActions.auto_load_wishlist, (state, action) => {
        const wishlist = state.wishlist || [];
        const alreadyIn = state.wishlist.find(x => x._id === action._id);
        let newWishlist = [];

        if (alreadyIn) {
            newWishlist = wishlist;
        } else {
            newWishlist = [...wishlist, { _id: action._id, productType: action.productType }];
        }
        return {
            ...state,
            wishlist: newWishlist
        }
    }),
    on(AuthActions.remove_wishlist, (state, action) => {
        let newWishlist = [...state.wishlist];
        const item = state.wishlist.find(x => x._id === action._id);

        if(item) {
            const index = state.wishlist.indexOf(item);
            newWishlist.splice(index, 1);
        }
        return {
            ...state,
            wishlist: newWishlist
        }
    })

)

export function authReducer(state: IAuthState | undefined, action: Action): IAuthState {
    return _authReducer(state, action);
}
