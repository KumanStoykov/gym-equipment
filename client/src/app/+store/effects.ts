import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

import * as AuthActions from './actions';

@Injectable()

export class AuthEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }

    addToWishlist$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.addToWishlist),
        mergeMap((action: AuthActions.wishlistProps) => this.userService.addToWishlist({ _id: action._id, productType: action.productType })
            .pipe(
                map(() => ({ type: 'Success' }))
            )
        )

    ));
    removeFromWishlist$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.removeFromWishlist),
        mergeMap((action: AuthActions.wishlistProps) => this.userService.removeFromWishlist({ _id: action._id, productType: action.productType })
            .pipe(
                map(() => ({ type: 'Success' }))
            )
        )

    ));
    addToCart$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.addToCart),
        mergeMap((action: AuthActions.cartProps) => this.userService.addToCart({ _id: action._id, productType: action.productType, quantity: action.quantity })
            .pipe(
                map(() => ({ type: 'Success' }))
            )
        )

    ));
    removeFromCart$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.removeFromCart),
        mergeMap((action: AuthActions.cartProps) => this.userService.removeFromCart({ _id: action._id, productType: action.productType, quantity: action.quantity })
            .pipe(
                map(() => ({ type: 'Success' }))
            )
        )

    ));
    increaseQuantityCart$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.increaseQuantityCart),
        mergeMap((action: AuthActions.cartProps) => this.userService.increaseQuantityCart({ _id: action._id, productType: action.productType, quantity: action.quantity })
            .pipe(
                map(() => ({ type: 'Success' }))
            )
        )

    ));
    decreaseQuantityCart$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.decreaseQuantityCart),
        mergeMap((action: AuthActions.cartProps) => this.userService.decreaseQuantityCart({ _id: action._id, productType: action.productType, quantity: action.quantity })
            .pipe(
                map(() => ({ type: 'Success' }))
            )
        )

    ));
    emptyCart$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.emptyCart),
        mergeMap((action: AuthActions.cartProps) => this.userService.emptyCart()
            .pipe(
                map(() => ({ type: 'Success' }))
            )
        )

    ));
}
