import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BenchService } from 'src/app/bench/bench.service';
import { IBench } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-create-bench',
    templateUrl: './create-bench.component.html',
    styleUrls: ['./create-bench.component.scss']
})
export class CreateBenchComponent implements OnInit {
    @ViewChild('form') form!: NgForm;

    files: [] = [];
    fileIsChose: boolean = false;

    rack: IBench | undefined;
    error: string = '';
    isLoading: boolean = false;
    filesCount: number | undefined;

    constructor(
        private benchService: BenchService,
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

        this.benchService.create(formData).subscribe({
            next: data => {
                this.router.navigateByUrl('/');
                this.isLoading = false;
            },
            error: err => {
                this.error = err.error.message;
                this.isLoading = false;
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
