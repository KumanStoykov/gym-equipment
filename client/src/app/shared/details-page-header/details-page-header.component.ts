import { Component, OnInit } from '@angular/core';

import { faHeart, faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-details-page-header',
  templateUrl: './details-page-header.component.html',
  styleUrls: ['./details-page-header.component.scss']
})
export class DetailsPageHeaderComponent implements OnInit {

    icons = {
        faHeart,
        faCartPlus,
        faCheck
    };

    images = [
        '../../../assets/gallery1.jpg',
        '../../../assets/gallery2.jpg',
        '../../../assets/gallery3.jpg',
        '../../../assets/gallery4.jpg',
    ]

  constructor() { }

  ngOnInit(): void {
  }

}
