import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

    dumbbell: IDumbbell | undefined;
    error: string = '';
    isLoading: boolean = false;
    filesCount: number | undefined;
    isEdit: boolean = false;

    constructor(
        private dumbbellService: DumbbellService,
        private activateRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const urlIsEdit = this.activateRoute.snapshot.url[0] && this.activateRoute.snapshot.url[0].path === 'edit';

        if(urlIsEdit) {
            this.isLoading = true;

            this.dumbbellService.getOne(this.activateRoute.snapshot.url[2].path).subscribe({
                next: dumbbell => {
                    this.dumbbell = dumbbell;
                    this.isEdit = true;
                    this.isLoading = false;
                },
                error: err => {
                    this.isEdit = false;
                    this.isLoading = false;
                }
            })
        }
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

        if(this.isEdit) {
            const id = this.activateRoute.snapshot.url[2].path;
            this.dumbbellService.edit(formData, id).subscribe({
                next: data => {
                    this.router.navigateByUrl('/');
                    this.isLoading = false;
                },
                error: err => {
                    this.error = err.error.message;
                    this.isLoading = false;
                }
            });

        } else {
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
            });
        }
    }

    onCloseNot(): void {
        this.error = '';
        if(this.error.includes('Something went wrong')) {
            console.log('')
            this.router.navigate(['/'])
        }
    }

}
