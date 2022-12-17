import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart } from 'chart.js/auto';
import { AdminService } from '../admin.service';

@Component({
    selector: 'app-chart-products',
    templateUrl: './chart-sales-products.component.html',
    styleUrls: ['./chart-sales-products.component.scss']
})
export class ChartSalesProductsComponent implements OnInit {
    @ViewChild('canvas', { static: true }) canvas!: ElementRef;
    newChart: Chart | any;

    isLoading: boolean = false;
    error: string = '';

    constructor(
        private adminService: AdminService
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.adminService.getSalesProduct().subscribe({
            next: orders => {
                this.isLoading = false;
                this.newChart = new Chart(this.canvas.nativeElement, {
                    type: 'doughnut',
                    data: {
                        labels: ['Treadmills', 'Bikes', 'Racks', 'Benches', 'Dumbbells'],
                        datasets: [
                            {
                                label: 'Product count',
                                data: Object.values(orders.sales),
                                backgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(54, 162, 235)',
                                    'rgb(25, 205, 86)',
                                    'rgb(255, 20, 86)',
                                    'rgb(255, 205, 8)'
                                ],
                                hoverOffset: 5,
                            }
                        ]
                    },
                    options: {

                        plugins: {
                            title: {
                                display: true,
                                text: 'Products Sales',
                                font: {
                                    size: 32,
                                    family: "Dosis"
                                }
                            },
                            subtitle: {
                                display: true,
                                text: `Total Sales Product ${orders.totalSales}`,
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
