import { createReducer, on, Action } from '@ngrx/store';

import { IUser } from '../../shared/interfaces';

import * as AuthActions from './actions';

export interface IAuthState {
    user: IUser | null;
    message: AuthActions.messageProps | null;
}

export const featureKey = 'auth';

const initialState: IAuthState = {
    user: null,
    message: null
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
    })

)

export function authReducer(state: IAuthState | undefined, action: Action): IAuthState {
    return _authReducer(state, action);
}
