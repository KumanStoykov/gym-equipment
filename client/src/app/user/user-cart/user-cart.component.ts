import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import { IProduct, IUser } from 'src/app/shared/interfaces';
import * as authSelectors from '../../+store/selectors';
import * as authActions from '../../+store/actions';
import { IAuthState } from 'src/app/+store/reducers';
import { first, Observable, Subscription } from 'rxjs';

import { BenchService } from 'src/app/bench/bench.service';
import { BikeService } from 'src/app/bike/bike.service';
import { DumbbellService } from 'src/app/dumbbell/dumbbell.service';
import { RackService } from 'src/app/rack/rack.service';
import { TreadmillService } from 'src/app/treadmill/treadmill.service';
import { extractFromRequest } from '../../shared/utils/extractFromRequest'
import { cartProps } from 'src/app/+store/actions';


@Component({
    selector: 'app-user-cart',
    templateUrl: './user-cart.component.html',
    styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit, OnDestroy {

    heroTitle: string = 'CART';
    pageTitle: string = 'CHECKOUT';

    isLoading: boolean = false;
    products: IProduct[] = [];
    delivery: number = 0;
    totalPrice: number = 0;
    cartSub: Subscription = new Subscription();

    cart$: Observable<cartProps[]> = this.store.select(authSelectors.selectCart);
    user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);


    constructor(
        private store: Store<IAuthState>,
        private treadmillService: TreadmillService,
        private bikeService: BikeService,
        private rackService: RackService,
        private benchService: BenchService,
        private dumbbellService: DumbbellService
    ) {

    }

    ngOnInit(): void {
        this.cartSub = this.cart$.pipe(first()).subscribe({
            next: cart => {
                this.isLoading = true;
                this.products = this.requestCart(cart);
            },
            error: err => {
                this.isLoading = false;
                this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
            }
        })
    }


    requestCart(cart: cartProps[]): IProduct[] {
        const fetchedCart: IProduct[] = [];

        if (cart.length === 0) {
            this.isLoading = false;
            return [];
        }

        cart.forEach((x: { _id: string, productType: string }, index) => {

            if (x.productType === 'treadmill') {
                this.treadmillService.getOne(x._id).subscribe({
                    next: data => {
                        this.isLoading = false;
                        let cartData = extractFromRequest(data);
                        cartData.quantity = cart[index].quantity;
                        fetchedCart.push(cartData);
                        data.promoPrice !== 0 ? this.totalPrice += Number(data.promoPrice) * cart[index].quantity : this.totalPrice += Number(data.price) * cart[index].quantity;
                        this.delivery = this.totalPrice > 200 ? 0 : 30;
                    },
                    error: err => {
                        this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
                        this.isLoading = false;
                    }
                });

            } else if (x.productType === 'bike') {
                this.bikeService.getOne(x._id).subscribe({
                    next: data => {
                        this.isLoading = false;
                        let cartData = extractFromRequest(data);
                        cartData.quantity = cart[index].quantity;
                        fetchedCart.push(cartData);
                        data.promoPrice !== 0 ? this.totalPrice += Number(data.promoPrice) * cart[index].quantity : this.totalPrice += Number(data.price) * cart[index].quantity;
                        this.delivery = this.totalPrice > 200 ? 0 : 30;
                    },
                    error: err => {
                        this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
                        this.isLoading = false;
                    }
                });
            } else if (x.productType === 'rack') {
                this.rackService.getOne(x._id).subscribe({
                    next: data => {
                        this.isLoading = false;
                        let cartData = extractFromRequest(data);
                        cartData.quantity = cart[index].quantity;
                        fetchedCart.push(cartData);
                        data.promoPrice !== 0 ? this.totalPrice += Number(data.promoPrice) * cart[index].quantity : this.totalPrice += Number(data.price) * cart[index].quantity;
                        this.delivery = this.totalPrice > 200 ? 0 : 30;
                    },
                    error: err => {
                        this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
                        this.isLoading = false;
                    }
                });
            } else if (x.productType === 'bench') {
                this.benchService.getOne(x._id).subscribe({
                    next: data => {
                        this.isLoading = false;
                        let cartData = extractFromRequest(data);
                        cartData.quantity = cart[index].quantity;
                        fetchedCart.push(cartData);
                        data.promoPrice !== 0 ? this.totalPrice += Number(data.promoPrice) * cart[index].quantity : this.totalPrice += Number(data.price) * cart[index].quantity;
                        this.delivery = this.totalPrice > 200 ? 0 : 30;
                    },
                    error: err => {
                        this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
                        this.isLoading = false;
                    }
                });
            } else if (x.productType === 'dumbbell') {
                this.dumbbellService.getOne(x._id).subscribe({
                    next: data => {
                        this.isLoading = false;
                        let cartData = extractFromRequest(data);
                        cartData.quantity = cart[index].quantity;
                        fetchedCart.push(cartData);
                        data.promoPrice !== 0 ? this.totalPrice += Number(data.promoPrice) * cart[index].quantity : this.totalPrice += Number(data.price) * cart[index].quantity;
                        this.delivery = this.totalPrice > 200 ? 0 : 30;
                    },
                    error: err => {
                        this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
                        this.isLoading = false;
                    }
                });
            }
        })
        this.isLoading = false;
        return fetchedCart;
    }

    removeFromCartHandler(product: IProduct): void {
        this.store.dispatch(authActions.remove_cart({ _id: product._id, productType: product.productType, quantity: product.quantity! }));
        const isProductIn = this.products.find(x => x._id === product._id);
        if(isProductIn) {
            const index = this.products.indexOf(isProductIn);
            this.products.splice(index, 1);
        }
        this.totalPrice = this.products.reduce((a, x) => x.promoPrice !== 0 ? a + (x.promoPrice * x.quantity!) : a + (x.price * x.quantity!), 0);
        this.delivery = this.totalPrice > 200 ? 0 : 30;
    }

    increaseCartHandler(product: IProduct): void {
        this.store.dispatch(authActions.increase_quantity_cart({ _id: product._id, productType: product.productType, quantity: product.quantity! }));
        const isProductIn = this.products.find(x => x._id === product._id);
        if(isProductIn) {
            const index = this.products.indexOf(isProductIn);
            this.products[index].quantity++;
        }
        this.totalPrice = this.products.reduce((a, x) => x.promoPrice !== 0 ? a + (x.promoPrice * x.quantity!) : a + (x.price * x.quantity!), 0);
        this.delivery = this.totalPrice > 200 ? 0 : 30;
    }
    decreaseCartHandler(product: IProduct): void {
        this.store.dispatch(authActions.decrease_quantity_cart({ _id: product._id, productType: product.productType, quantity: product.quantity! }));
        const isProductIn = this.products.find(x => x._id === product._id);
        if(isProductIn) {
            const index = this.products.indexOf(isProductIn);
            this.products[index].quantity--;
        }
        if(product.quantity === 0) {
            this.removeFromCartHandler(product);
        }
        this.totalPrice = this.products.reduce((a, x) => x.promoPrice !== 0 ? a + (x.promoPrice * x.quantity!) : a + (x.price * x.quantity!), 0);
        this.delivery = this.totalPrice > 200 || this.totalPrice === 0 ? 0 : 30;

    }

    ngOnDestroy(): void {
        this.cartSub.unsubscribe();
    }
}
