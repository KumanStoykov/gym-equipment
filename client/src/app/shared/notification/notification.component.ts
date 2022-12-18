import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnDestroy, OnInit {
    @Input() message: string = '';
    @Input() typeMsg: string = 'error';
    @Output('notDestroy') notDestroy: EventEmitter<boolean> = new EventEmitter;

    toastSubscription!: Subscription;

    closeNotificationFive$ = interval(5000).pipe(
        map(() => this.notDestroy.emit(true))

    );
    closeNotificationTwo$ = interval(2000).pipe(
        map(() => this.notDestroy.emit(true))

    );

    isOpen: boolean = true;

    constructor() {
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
