import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { clear_message } from '../../+store/actions';
import { IAuthState } from 'src/app/+store/reducers';
@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnDestroy, OnInit {
    @Input() message: string | undefined;
    @Input() typeMsg: string | undefined;
    @Output('notDestroy') notDestroy: EventEmitter<boolean> = new EventEmitter;

    toastSubscription!: Subscription;

    closeNotificationFive$ = interval(5000).pipe(
        map(() => {
            this.notDestroy.emit(true);
            this.store.dispatch(clear_message());
        })

    );
    closeNotificationTwo$ = interval(2000).pipe(
        map(() => {
            this.notDestroy.emit(true);
            this.store.dispatch(clear_message());
        })

    );

    isOpen: boolean = true;


        constructor(private store: Store<IAuthState>) {
    }

    ngOnInit(): void {
        if(this.typeMsg === 'successful') {
            this.toastSubscription = this.closeNotificationTwo$.subscribe(() => this.notDestroy);
        } else {
            this.toastSubscription = this.closeNotificationFive$.subscribe(() => this.notDestroy);
        }
    }

    ngOnDestroy(): void {
        this.toastSubscription.unsubscribe();
    }
}
