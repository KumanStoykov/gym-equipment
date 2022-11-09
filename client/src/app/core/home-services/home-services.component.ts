import { Component, OnInit } from '@angular/core';

import { faCartShopping, faGift, faDollar } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-home-services',
    templateUrl: './home-services.component.html',
    styleUrls: ['./home-services.component.scss']
})
export class HomeServicesComponent implements OnInit {

    icons = {
        faCartShopping,
        faGift,
        faDollar
    }

    constructor() { }

    ngOnInit(): void {
    }

}
