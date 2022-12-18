import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


import { IProduct, IUser } from 'src/app/shared/interfaces';
import { IAuthState } from 'src/app/+store/reducers';
import * as authSelectors from '../../+store/selectors';
import * as authActions from '../../+store/actions';


import { faHeart, faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { add_message, cartProps, wishlistProps } from '../../+store/actions';


@Component({
    selector: 'app-details-page-header',
    templateUrl: './details-page-header.component.html',
    styleUrls: ['./details-page-header.component.scss']
})
export class DetailsPageHeaderComponent implements OnInit, OnDestroy {

    @Input() product: any;

    hasPromo: boolean = false;
    isHover: boolean = false;
    productType: any = '';
    conIsOpen: boolean = false;
    isLoading: boolean = false;
    message: string = '';
    typeMsg: string = '';

    hasInWishlist: boolean = false;
    hasInCart: boolean = false;

    icons = {
        faHeart,
        faCartPlus,
        faCheck,
        faHeartRegular
    };

    wishlistSub: Subscription = new Subscription();
    cartSub: Subscription = new Subscription();

    user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);
    wishlist$: Observable<wishlistProps[]> = this.store.select(authSelectors.selectWishlist);
    cart$: Observable<cartProps[]> = this.store.select(authSelectors.selectCart);

    constructor(
        private store: Store<IAuthState>,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.hasPromo = this.product.promoPrice > 0;
        this.productType = this.router.url.split('/')[1] === 'strength'
            ? this.router.url.split('/')[2]
            : this.router.url.split('/')[1];

        this.wishlistSub = this.wishlist$.subscribe({
            next: wishlist => {
                this.isLoading = false;
                this.hasInWishlist = wishlist.some(x => x._id === this.product._id);
            },
            error: err => {
                this.isLoading = false;
                this.message = err.error;
                this.typeMsg = 'error';
            }
        })
        this.cartSub = this.cart$.subscribe({
            next: cart => {
                this.isLoading = false;
                this.hasInCart = cart.some(x => x._id === this.product._id);
            },
            error: err => {
                this.isLoading = false;
                this.message = err.error;
                this.typeMsg = 'error';
            }
        })
    }

    addToWishlistHandler(): void {
        this.store.dispatch(authActions.add_wishlist({ _id: this.product._id, productType: this.productType }));
        this.typeMsg = 'successful';
        this.message = 'Successful added to wishlist.'
    }

    removeFromWishlistHandler(product: IProduct): void {
        this.store.dispatch(authActions.remove_wishlist({ _id: product._id, productType: product.productType }));
    }
    addToCartHandler(): void {
        this.store.dispatch(authActions.add_cart({ _id: this.product._id, productType: this.productType, quantity: 1 }));
        this.typeMsg = 'successful';
        this.message = 'Successful added to cart.'
    }

    hoverHandle(over: boolean): void {
        this.isHover = over;
    }

    deleteConfirm(): void {
        this.conIsOpen = this.conIsOpen
        this.store.dispatch(add_message({
            text: '',
            typeMsg: 'delete',
            product: this.productType,
            _id: this.product._id
        }));
    }
    onCloseNot(): void {
        this.message = '';

    }

    ngOnDestroy(): void {
        this.wishlistSub.unsubscribe();
        this.cartSub.unsubscribe();
    }
}
