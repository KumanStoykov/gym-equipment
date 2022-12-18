import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-product-card',
  templateUrl: './admin-product-card.component.html',
  styleUrls: ['./admin-product-card.component.scss']
})
export class AdminProductCardComponent implements OnInit {
    @Input() product: any;
    @Input() cardType!: string;



    strengthTypes: string[] = ['rack', 'bench', 'dumbbell'];

    constructor() {
    }

    ngOnInit(): void {
        this.cardType = this.cardType.toLowerCase();

        if(this.strengthTypes.includes(this.cardType)) {
            this.cardType = `/strength/${this.cardType}`;
        }
    }

}
