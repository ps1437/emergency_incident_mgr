import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ploar-area-chart',
  templateUrl: './ploar-area-chart.component.html',
  styleUrls: ['./ploar-area-chart.component.css']
})
export class PloarAreaChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public polarAreaLegend: boolean = true;


  // Doughnut
  @Input() polarAreaChartLabels: string[];
  @Input() polarAreaChartData: number[];
  @Input() options: any;
  public polarAreaChartType: string = 'polarArea';




  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
