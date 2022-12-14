import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces';
import { IAuthState } from 'src/app/+store/authStore/reducers';
import * as authSelectors from '../../+store/authStore/selector';


import { faHeart, faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { add_message } from '../../+store/authStore/actions';


@Component({
    selector: 'app-details-page-header',
    templateUrl: './details-page-header.component.html',
    styleUrls: ['./details-page-header.component.scss']
})
export class DetailsPageHeaderComponent implements OnInit {

    @Input() product: any;

    hasPromo: boolean = false;
    isHover: boolean = false;
    productType: any = '';
    conIsOpen: boolean = false;

    icons = {
        faHeart,
        faCartPlus,
        faCheck,
        faHeartRegular
    };

    user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);

    constructor(
        private store: Store<IAuthState>,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.hasPromo = this.product.promoPrice > 0;
        this.productType = this.router.url.split('/')[1] === 'strength'
            ? this.router.url.split('/')[2]
            : this.router.url.split('/')[1];
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
}
