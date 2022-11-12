import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bench-list',
  templateUrl: './bench-list.component.html',
  styleUrls: ['./bench-list.component.scss']
})
export class BenchListComponent implements OnInit {

    heroTitle = 'BENCHES';
    pageTitle = 'SUPREME RUNNING PERFORMANCE';

  constructor() { }

  ngOnInit(): void {
  }

}
