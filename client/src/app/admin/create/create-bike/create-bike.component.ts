import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { BikeService } from 'src/app/bike/bike.service';
import { IBike } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-create-bike',
    templateUrl: './create-bike.component.html',
    styleUrls: ['./create-bike.component.scss']
})
export class CreateBikeComponent implements OnInit {

    @ViewChild('form') form!: NgForm;

    files: [] = [];
    fileIsChose: boolean = false;

    bike: IBike | undefined;
    error!: string;
    isLoading: boolean = false;
    filesCount: number | undefined;


    constructor(
        private bikeService: BikeService,
        private router: Router
    ) { }

    ngOnInit(): void {

    }

    onFileSelect(event: any): void {
        const input = event.target;
        this.files = input.files;
        this.filesCount = this.files?.length;

        if (this.filesCount && this.filesCount > 0) {
            this.fileIsChose = true;
        } else {
            this.fileIsChose = false;
        }
    }

    onSubmit() {

        const formData = new FormData();

        for (const [k, v] of Object.entries(this.form.value)) {
            formData.append(k, v as string)
        }

        for (const [k, v] of Object.entries(this.files)) {
            formData.append('images' + k, v as string)
        }

        this.isLoading = true;

        this.bikeService.create(formData).subscribe({
            next: data => {
                this.router.navigateByUrl('/');
                this.isLoading = false;

            },
            error: err => {
                this.error = err.error.message;
                this.isLoading = false;
                console.log(err.error)
            }
        })

    }

    onCloseNot(): void {
        this.error = '';
        if(this.error.includes('Something went wrong')) {
            console.log('')
            this.router.navigate(['/'])
        }
    }

}
