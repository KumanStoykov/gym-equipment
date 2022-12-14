import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


import { IUser } from 'src/app/shared/interfaces';
import * as authSelectors from '../../+store/authStore/selector';
import { IAuthState } from 'src/app/+store/authStore/reducers';
@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {
  user$: Observable<IUser | null> = this.store.select(authSelectors.selectUser);

  constructor(
    private store: Store<IAuthState>,

  ) { }

  ngOnInit(): void {
  }

}
