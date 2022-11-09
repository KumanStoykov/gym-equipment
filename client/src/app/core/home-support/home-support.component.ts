import { Component, OnInit } from '@angular/core';

import { faMicrophone, faComments, faBullhorn } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-home-support',
    templateUrl: './home-support.component.html',
    styleUrls: ['./home-support.component.scss']
})
export class HomeSupportComponent implements OnInit {

    icons = {
        faMicrophone,
        faComments,
        faBullhorn
    }

    constructor() { }

    ngOnInit(): void {
    }

}
