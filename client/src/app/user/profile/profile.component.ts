import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';

import { IAuthState } from 'src/app/+store/reducers';
import { IUser } from 'src/app/shared/interfaces';
import { add_message } from '../../+store/actions';
import { UserService } from '../user.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    heroTitle: string = 'PROFILE';
    isEdit: boolean = false;
    conIsOpen: boolean = false;

    user: IUser | undefined;

    newUserDataSub: Subscription = new Subscription;

    constructor(
        private store: Store<IAuthState>,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.newUserDataSub = this.userService.subUserData$$.asObservable().subscribe(user => {
            this.user = user;
        });

        this.userService.loadProfile().subscribe({
            next: user => {
                this.user = user;
            }
        });


    }

    editClickHandler(): void {
        this.isEdit = !this.isEdit;
    }
    deleteConfirm(): void {
        this.conIsOpen = this.conIsOpen;
        of(null).subscribe({
            next: () => {
                this.store.dispatch(add_message({
                    text: '',
                    typeMsg: 'delete',
                    product: 'user',
                    _id: this.user?._id
                }))
            }
        })

    }

    ngOnDestroy(): void {
        this.newUserDataSub.unsubscribe();
    }
}
