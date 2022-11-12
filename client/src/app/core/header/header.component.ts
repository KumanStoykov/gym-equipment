import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    menuIsToggle: boolean = false;
    strengthIsToggle: boolean = false;
    accountIsToggle: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    public menuToggle(): void {
        this.menuIsToggle = !this.menuIsToggle;
        this.strengthIsToggle = false;
        this.accountIsToggle = false;
    }

    public handleOutsideClick(): void {
        this.menuIsToggle = false;
        this.strengthIsToggle = false;
        this.accountIsToggle = false;
    }

    public dropdownToggle(btnName: string): void {

        if (btnName === 'account') {
            this.accountIsToggle = !this.accountIsToggle;
            this.strengthIsToggle = false;

        } else {
            this.strengthIsToggle = !this.strengthIsToggle;
            this.accountIsToggle = false;
        }
    }

}
