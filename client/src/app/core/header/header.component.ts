import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import { IAuthState } from 'src/app/+store/reducers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    menuIsToggle: boolean = false;
    strengthIsToggle: boolean = false;



    constructor() { }

    ngOnInit(): void {
    }

    menuToggle(): void {
        this.menuIsToggle = !this.menuIsToggle;
        this.strengthIsToggle = false;
    }

    handleOutsideClick(): void {
        this.menuIsToggle = false;
        this.strengthIsToggle = false;
    }

    dropdownToggle(): void {
        this.strengthIsToggle = !this.strengthIsToggle;
    }



}
