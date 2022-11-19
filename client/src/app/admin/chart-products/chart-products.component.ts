import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chart } from 'chart.js/auto';

@Component({
    selector: 'app-chart-products',
    templateUrl: './chart-products.component.html',
    styleUrls: ['./chart-products.component.scss']
})
export class ChartProductsComponent implements OnInit {
    @ViewChild('canvas', { static: true }) canvas!: ElementRef;
    newChart: Chart | any;

    constructor() { }

    ngOnInit(): void {
        this.newChart = new Chart(this.canvas.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ['Treadmills', 'Bikes', 'Racks', 'Benches', 'Dumbbells'],
                datasets: [
                    {
                        label: 'Sales Product',
                        data: ['1', '2', '3', '12', '5'],
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
                            size: 24,
                            family: "Dosis"
                        }
                    }
                },


            }

        })
    }

}
