import { Component, OnInit } from '@angular/core';

import { faHeart, faCartPlus, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-treadmill-details',
  templateUrl: './treadmill-details.component.html',
  styleUrls: ['./treadmill-details.component.scss']
})
export class TreadmillDetailsComponent implements OnInit {

    heroTitle = 'DETAILS';

    icons = {
        faHeart,
        faCartPlus,
        faStar,
        faStarHalf
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
