import { createReducer, on, Action } from '@ngrx/store';

import { IUser } from '../shared/interfaces';

import * as AuthActions from './actions';

export interface IAuthState {
    user: IUser | null;
    message: AuthActions.messageProps | null;
    comments: AuthActions.commentProps | null;
    wishlist: AuthActions.wishlistProps[];
    cart: AuthActions.cartProps[];
}

export const featureKey = 'auth';

const initialState: IAuthState = {
    user: null,
    message: null,
    comments: null,
    wishlist: [],
    cart: []
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
        return {
            ...state,
            user: null
        }
    }),
    on(AuthActions.auth_logout, (state) => {
        return {
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

        if (item) {
            const index = state.wishlist.indexOf(item);
            newWishlist.splice(index, 1);
        }
        return {
            ...state,
            wishlist: newWishlist
        }
    }),
    on(AuthActions.add_cart, AuthActions.auto_load_cart, (state, action) => {
        const cart = [...state.cart] || [];
        const alreadyIn = state.cart.find(x => x._id === action._id);


        if (alreadyIn) {
            const index = cart.indexOf(alreadyIn);
            const quantity = cart[index].quantity;
            cart[index] = {
                ...cart[index] = {
                    ...cart[index],
                    quantity: quantity + 1
                }
            }
        } else {
            cart.push({ _id: action._id, productType: action.productType, quantity: action.quantity });
        }

        return {
            ...state,
            cart: cart
        }
    }),
    on(AuthActions.remove_cart, (state, action) => {
        let newCart= [...state.cart];
        const item = state.cart.find(x => x._id === action._id);

        if (item) {
            const index = state.wishlist.indexOf(item);
            newCart.splice(index, 1);
        }
        return {
            ...state,
            cart: newCart
        }
    }),
    on(AuthActions.decrease_quantity_cart, (state, action) => {
        const newCart = [...state.cart];
        const product = state.cart.find(x => x._id === action._id);


        if (product) {
            const index = state.cart.indexOf(product);
            const newProduct = { ...newCart[index], quantity: newCart[index].quantity - 1};
            newCart.splice(index, 1, newProduct)

        }

        return {
            ...state,
            cart: newCart
        }
    }),
    on(AuthActions.increase_quantity_cart, (state, action) => {
        const newCart = [...state.cart];
        const product = state.cart.find(x => x._id === action._id);


        if (product) {
            const index = state.cart.indexOf(product);
            const newProduct = { ...newCart[index], quantity: newCart[index].quantity + 1};
            newCart.splice(index, 1, newProduct)

        }

        return {
            ...state,
            cart: newCart
        }
    }),
    on(AuthActions.empty_cart, (state) => {
        return{
            ...state,
            cart: []
        }
    })

)

export function authReducer(state: IAuthState | undefined, action: Action): IAuthState {
    return _authReducer(state, action);
}
