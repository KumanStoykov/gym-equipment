import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBench } from 'src/app/shared/interfaces';
import { BenchService } from '../bench.service';

@Component({
  selector: 'app-bench-details',
  templateUrl: './bench-details.component.html',
  styleUrls: ['./bench-details.component.scss']
})
export class BenchDetailsComponent implements OnInit {

    heroTitle = 'DETAILS';

    bench!: IBench;
    isLoading: boolean = false;
    error: string = '';

    id = this.router.url.split('/')[3];

    constructor(
        private benchService: BenchService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.benchService.getOne(this.id).subscribe({
            next: bench => {
                this.bench = bench;
                this.isLoading = false;
            },
            error: err => {
                console.log(err)
                this.isLoading = false;
                this.error = err.error.message || 'Something went wrong, Please try again later.';
            }
        })

    }

    onCloseNot(): void {
        this.error = '';
        if(this.error.includes('Something went wrong')) {
            this.router.navigate(['/'])
        }
    }

}
