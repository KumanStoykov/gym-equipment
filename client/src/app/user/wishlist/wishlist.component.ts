import { Component, OnDestroy, OnInit } from '@angular/core';
import { first, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';


import { IProduct, IUser } from 'src/app/shared/interfaces';
import * as authSelectors from '../../+store/selectors';
import * as authActions from '../../+store/actions';
import { IAuthState } from 'src/app/+store/reducers';
import { wishlistProps } from 'src/app/+store/actions';
import { TreadmillService } from 'src/app/treadmill/treadmill.service';
import { BikeService } from 'src/app/bike/bike.service';
import { RackService } from 'src/app/rack/rack.service';
import { BenchService } from 'src/app/bench/bench.service';
import { DumbbellService } from 'src/app/dumbbell/dumbbell.service';
import { extractFromRequest } from '../../shared/utils/extractFromRequest'
@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {

    heroTitle: string = 'WISHLIST';
    pageTitle: string = 'WATCHED ITEMS';

    products: IProduct[] = [];
    page: number = 1;
    count: number = 0;
    isLoading: boolean = false;

    wishlistSub: Subscription = new Subscription();

    wishlist$: Observable<wishlistProps[]> = this.store.select(authSelectors.selectWishlist);
    user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);


    constructor(
        private store: Store<IAuthState>,
        private treadmillService: TreadmillService,
        private bikeService: BikeService,
        private rackService: RackService,
        private benchService: BenchService,
        private dumbbellService: DumbbellService
    ) { }

    ngOnInit(): void {

        this.wishlistSub = this.wishlist$.pipe(first()).subscribe({
            next: wishlist => {
                this.isLoading = true;
                this.products = this.requestWishlist(wishlist);
            },
            error: err => {
                this.isLoading = false;
                this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
            }
        })
    }

    requestWishlist(wishlist: wishlistProps[]): IProduct[] {
        const fetchedWishlist: IProduct[] = [];


        if (wishlist.length === 0) {
            this.isLoading = false;
            return [];
        }

        wishlist.forEach((x: { _id: string, productType: string }) => {

            if (x.productType === 'treadmill') {
                this.treadmillService.getOne(x._id).subscribe({
                    next: data => {
                        this.isLoading = false;
                        let wishlistData = extractFromRequest(data);
                        fetchedWishlist.push(wishlistData);
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
                        let wishlistData = extractFromRequest(data);
                        fetchedWishlist.push(wishlistData);
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
                        let wishlistData = extractFromRequest(data);
                        fetchedWishlist.push(wishlistData);
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
                        let wishlistData = extractFromRequest(data);
                        fetchedWishlist.push(wishlistData);
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
                        let wishlistData = extractFromRequest(data);
                        fetchedWishlist.push(wishlistData);
                    },
                    error: err => {
                        this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message || 'Something went wrong, Please try again later.'}));
                        this.isLoading = false;
                    }
                });
            }
        });
        this.isLoading = false
        return fetchedWishlist;
    }

    addToCartHandler(product: IProduct): void {
        this.store.dispatch(authActions.add_cart({ _id: product._id, productType: product.productType, quantity : 1 }));
        this.store.dispatch(authActions.remove_wishlist({ _id: product._id, productType: product.productType }));

        const isProductIn = this.products.find(x => x._id === product._id);
        if(isProductIn) {
            const index = this.products.indexOf(isProductIn);
            this.products.splice(index, 1);
        }
    }

    removeFromWishlistHandler(product: IProduct): void {
        this.store.dispatch(authActions.remove_wishlist({ _id: product._id, productType: product.productType }));
        const isProductIn = this.products.find(x => x._id === product._id);
        if(isProductIn) {
            const index = this.products.indexOf(isProductIn);
            this.products.splice(index, 1);
        }
    }

    ngOnDestroy(): void {
        this.wishlistSub.unsubscribe();
    }
}
