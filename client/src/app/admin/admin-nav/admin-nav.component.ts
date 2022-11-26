import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin-nav',
    templateUrl: './admin-nav.component.html',
    styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

    dropdownIsToggle: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    dropdownToggle(): void {
     this.dropdownIsToggle = !this.dropdownIsToggle;
    }

    handleOutsideClick(): void {
        this.dropdownIsToggle = false;
    }
}
