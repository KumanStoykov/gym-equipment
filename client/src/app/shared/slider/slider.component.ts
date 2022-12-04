import { Component, Input, OnInit } from '@angular/core';

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { IImage } from '../interfaces';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

    @Input() images: IImage[] = [];

    imgIndex = 0;

    icons = {
        faAngleLeft,
        faAngleRight
    }


    constructor() { }

    ngOnInit(): void {
    }

    public indexNext(): void {
        if (this.imgIndex === this.images.length - 1) {
            this.imgIndex = 0;
        } else {
            this.imgIndex += 1;
        }
    }

    public indexPreview(): void {
        if (this.imgIndex === 0) {
            this.imgIndex = this.images.length - 1;
        } else {
            this.imgIndex -= 1;
        }
    }

    public imageClick(currentIndex: number): void {
        this.imgIndex = currentIndex;
    }
}
