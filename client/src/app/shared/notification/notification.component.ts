import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { interval, map, Observable, of, Subscription, tap, timer } from 'rxjs';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnDestroy, OnInit, OnChanges {
    @Input() errorMessage: string = '';


    toastSubscription!: Subscription;

    closeNotification$ = interval(5000).pipe(
        map(() => this.isOpen = false)
    )


    isOpen: boolean = true;

    icons = {
        faCircleXmark
    }



    constructor() {
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.toastSubscription = this.closeNotification$.subscribe(() => this.isOpen);

    }

    ngOnDestroy(): void {
        this.toastSubscription.unsubscribe();
    }

}
