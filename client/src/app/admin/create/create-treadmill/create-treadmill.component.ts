import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/+store/reducers';

import { ITreadmill } from 'src/app/shared/interfaces';
import { TreadmillService } from 'src/app/treadmill/treadmill.service';
import * as authActions from '../../../+store/actions';

@Component({
    selector: 'app-create-treadmill',
    templateUrl: './create-treadmill.component.html',
    styleUrls: ['./create-treadmill.component.scss']
})
export class CreateTreadmillComponent implements OnInit {
    @ViewChild('form') form!: NgForm;

    files: [] = [];
    fileIsChose: boolean = false;

    treadmill: ITreadmill | undefined;
    isLoading: boolean = false;
    filesCount: number | undefined;
    isEdit: boolean = false;

    constructor(
        private treadmillService: TreadmillService,
        private activateRoute: ActivatedRoute,
        private router: Router,
        private store: Store<IAuthState>
    ) { }

    ngOnInit(): void {
        const urlIsEdit = this.activateRoute.snapshot.url[0] && this.activateRoute.snapshot.url[0].path === 'edit';

        if (urlIsEdit) {
            this.isLoading = true;

            this.treadmillService.getOne(this.activateRoute.snapshot.url[2].path).subscribe({
                next: treadmill => {
                    this.treadmill = treadmill;
                    this.isEdit = true;
                    this.isLoading = false;
                },
                error: err => {
                    this.isEdit = false;
                    this.isLoading = false;
                    this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message}));
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

        if (this.isEdit) {
            const id = this.activateRoute.snapshot.url[2].path;
            this.treadmillService.edit(formData, id).subscribe({
                next: data => {
                    this.router.navigateByUrl('/');
                    this.isLoading = false;
                },
                error: err => {
                    this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message}));
                    this.isLoading = false;
                }
            });

        } else {

            this.treadmillService.create(formData).subscribe({
                next: data => {
                    this.router.navigateByUrl('/');
                    this.isLoading = false;

                },
                error: err => {
                    this.store.dispatch(authActions.add_message({typeMsg: 'error', text: err.error.message}));
                    this.isLoading = false;
                }
            });
        }


    }
}
