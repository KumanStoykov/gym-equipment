import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DumbbellService } from 'src/app/dumbbell/dumbbell.service';
import { IDumbbell } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-create-dumbbell',
    templateUrl: './create-dumbbell.component.html',
    styleUrls: ['./create-dumbbell.component.scss']
})
export class CreateDumbbellComponent implements OnInit {
    @ViewChild('form') form!: NgForm;

    files: [] = [];
    fileIsChose: boolean = false;

    rack: IDumbbell | undefined;
    error: string | undefined;
    isLoading: boolean = false;
    filesCount: number | undefined;

    constructor(
        private dumbbellService: DumbbellService,
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

        this.dumbbellService.create(formData).subscribe({
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

}
