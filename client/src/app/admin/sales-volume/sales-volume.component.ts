import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
    selector: 'app-sales-volume',
    templateUrl: './sales-volume.component.html',
    styleUrls: ['./sales-volume.component.scss']
})
export class SalesVolumeComponent implements OnInit {

    @ViewChild('canvas', { static: true }) canvas!: ElementRef;
    newChart: Chart | any;


    constructor() { }

    ngOnInit(): void {
        this.newChart = new Chart(this.canvas.nativeElement, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ],
                datasets: [
                    {
                        label: 'Sales Items',
                        data: ['12', '122', '43', '24', '767', '7', '37', '100', '94', '132', '543', '1200'],
                        backgroundColor: 'rgb(0, 156, 223)',
                        borderColor: 'rgb(0, 156, 223)',
                        tension: 0.2
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
                    }
                },


            }

        })
    }

}
