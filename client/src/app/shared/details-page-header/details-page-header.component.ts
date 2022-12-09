import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces';
import { IAuthState } from 'src/app/+store/authStore/reducers';
import * as authSelectors from '../../+store/authStore/selector';


import { faHeart, faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-details-page-header',
  templateUrl: './details-page-header.component.html',
  styleUrls: ['./details-page-header.component.scss']
})
export class DetailsPageHeaderComponent implements OnInit {

    @Input() product: any;

    hasPromo: boolean = false;

    icons = {
        faHeart,
        faCartPlus,
        faCheck
    };

    user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);

  constructor(
    private store: Store<IAuthState>,
  ) { }

  ngOnInit(): void {
    this.hasPromo = this.product.promoPrice > 0;
  }

}
