import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    menuIsToggle: boolean = false;
    shopIsToggle: boolean = false;
    loginIsToggle: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    public menuToggle(): void {
        this.menuIsToggle = !this.menuIsToggle;
        this.shopIsToggle = false;
        this.loginIsToggle = false;
    }

    public handleOutsideClick(): void {
        this.menuIsToggle = false;
        this.shopIsToggle = false;
        this.loginIsToggle = false;
    }

    public dropdownToggle(btnName: string): void {
        console.log(btnName)
        if (btnName === 'login') {
            this.loginIsToggle = !this.loginIsToggle;
            this.shopIsToggle = false;

        } else {
            this.shopIsToggle = !this.shopIsToggle;
            this.loginIsToggle = false;
        }
    }

}
