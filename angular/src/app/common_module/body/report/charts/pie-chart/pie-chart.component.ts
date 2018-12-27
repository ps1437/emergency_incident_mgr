import { Component, OnInit,Input } from '@angular/core';
import {Report} from '../../../../../models/report.model';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() pieChartLabels:string[] ;
  @Input() pieChartData:number[] ;
  @Input() options:any ;
  public pieChartType:string = 'pie';

  constructor() { }

  ngOnInit() {


  }



}
