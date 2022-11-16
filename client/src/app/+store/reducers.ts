import { createReducer, on, Action } from '@ngrx/store';

import { IUser } from '../shared/interfaces';

import * as AuthActions from './actions';

export interface IAuthState {
    user: IUser | null;
}

export const featureKey = 'auth';

const initialState: IAuthState = {
    user: null,
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
    on(AuthActions.auth_fail, (state, action) => {
        return{
            ...state,
            user: null
        }
    }),
    on(AuthActions.auth_logout, (state, action) => {
        return{
            ...state,
            user: null
        }
    })

)

export function authReducer(state: IAuthState | undefined, action: Action): IAuthState {
    return _authReducer(state, action);
}
