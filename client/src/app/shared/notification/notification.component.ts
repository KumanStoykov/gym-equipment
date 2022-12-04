import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnDestroy, OnInit {
    @Input() errorMessage: string = '';
    @Output('notDestroy') notDestroy: EventEmitter<boolean> = new EventEmitter;

    toastSubscription!: Subscription;

    closeNotification$ = interval(5000).pipe(
        map(() => this.notDestroy.emit(true))

    );

    isOpen: boolean = true;

    constructor() {
    }

    ngOnInit(): void {
        this.toastSubscription = this.closeNotification$.subscribe(() => this.notDestroy);
    }

    ngOnDestroy(): void {
        this.toastSubscription.unsubscribe();
    }
}
