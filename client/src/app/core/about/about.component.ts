import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy{
    heroTitle: string = 'ABOUT US';
    isLoading = false;

    intervalTime = interval(700);
    subscription: Subscription = new Subscription();

    constructor() { }

    ngOnInit(): void {
        this.isLoading = true;

        this.subscription = this.intervalTime.subscribe(() => this.isLoading = false);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
