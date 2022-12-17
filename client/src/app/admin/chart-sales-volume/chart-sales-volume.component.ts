import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AdminService } from '../admin.service';

@Component({
    selector: 'app-sales-volume',
    templateUrl: './chart-sales-volume.component.html',
    styleUrls: ['./chart-sales-volume.component.scss']
})
export class ChartSalesVolumeComponent implements OnInit {

    @ViewChild('canvas', { static: true }) canvas!: ElementRef;
    newChart: Chart | any;

    isLoading: boolean = false;
    error: string = '';

    constructor(
        private adminService: AdminService
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.adminService.getVolumeProduct().subscribe({
            next: orders => {
                this.isLoading = false;


                this.newChart = new Chart(this.canvas.nativeElement, {
                    type: 'line',
                    data: {
                        labels: orders.labels,
                        datasets: [
                            {
                                label: 'Sales Items/Total Price',
                                data:orders.sales,
                                backgroundColor: 'rgb(0, 156, 223)',
                                borderColor: 'rgb(0, 156, 223)',
                                tension: 0.2,
                            }

                        ]

                    },
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: 'Products Volume',
                                font: {
                                    size: 24,
                                    family: 'Dosis'
                                }
                            },
                            subtitle: {
                                display: true,
                                text: 'Last 10 Days',
                                font: {
                                    size: 18,
                                    weight: '600',
                                    family: "Dosis"
                                },
                                padding: {
                                    bottom: 15
                                }
                            }
                        },


                    }

                })
            },
            error: err => {
                this.isLoading = false;
                this.error = err.error.message;
            }
        })

    }

    onCloseNot(): void {
        this.error = '';
    }

}
