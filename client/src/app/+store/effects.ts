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
}
