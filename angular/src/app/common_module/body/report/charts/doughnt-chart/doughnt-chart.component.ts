import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'doughnt-chart',
  templateUrl: './doughnt-chart.component.html',
  styleUrls: ['./doughnt-chart.component.css']
})
export class DoughntChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   // Doughnut
   @Input() doughnutChartLabels:string[] ;
   @Input() doughnutChartData:number[] ;
   @Input() options:any ;
   public doughnutChartType:string = 'doughnut';


  
   // events
   public chartClicked(e:any):void {
     console.log(e);
   }
  
   public chartHovered(e:any):void {
     console.log(e);
   }
}
