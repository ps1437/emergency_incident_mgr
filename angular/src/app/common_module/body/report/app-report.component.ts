import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Report } from '../../../models/report.model';
import { ToastrService } from 'ngx-toastr';
import { flyFromBottom } from '../../animations/animatation';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../authmodule/services/auth.service';

@Component({
  selector: 'app-report',
  templateUrl: './app-report.component.html',
  styleUrls: ['./app-report.component.css'],
  animations: [flyFromBottom]
})
export class AppReportComponent implements OnInit {
  barFlag: boolean;
  pieFlag: boolean = true;
  doughntFlag: boolean;
  polarFlag: boolean;
  reportData: Report[];
  title: string = 'Types of Incidents with count';
  month: number;
  year: number;
  userType: boolean = false;
  reportType: string = 'I';
  public pieChartData: number[] = [];
  totalNoOfIncident: number;
  public pieChartLabels: string[] = [];
  selections: string;
  reportExist: boolean = false
  charts: Object[] = [
    { key: 'pie', value: 'Pie Chart' },
    { key: 'doug', value: 'Doughnut Chart' },
    { key: 'polar', value: 'Polar Chart ' }
  ];
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  reportList: any;


  public barChartData: number[] = [];
  options: any = {
    legend: {
      position: "right",
      fontSize: "11px",
      lables: {
        fontColor: "green",
        fontSize: "10px"
      }
    },
    responsive: true,
    elements: {
      point: {
        pointStyle: "dash",
        radius: 1,
        hitRadius: 5,
        hoverRadius: 10,
        hoverBorderWidth: 5
      },
      arc: {
        backgroundColor: "#FF22FF"
      },
      rectangle: {
        borderColor: "#AADDAA",
        backgroundColor: "#11AACC"
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  createFlag: boolean = false;
  constructor(
    private _reportService: ReportService,
    private toastr: ToastrService,
    private spinnner: NgxSpinnerService,
    private authService: AuthService
  ) {
    this.pieFlag = true;
  }

  showGenerateReportForm() {
    this.createFlag = !this.createFlag;
     if(this.createFlag){
      this.drawChart(this.reportList);
     }
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    this.spinnner.show();
    this.pieFlag = true;
    this._reportService.prepareReportData().subscribe(res => {
      console.log(res);
      this.reportList = res;
      if (res.length > 0) {
        this.reportExist = true;
      }
      if (this.reportExist) {
        this.selections = 'pie';
        this.drawChart(res);
      }

      this.spinnner.hide();
    });

    const userType = this.authService.getTokenData();

    if (userType.userType === 'S') {
      this.userType = true;
    }

  }

  drawChart(res) {
    this.totalNoOfIncident = 0;
    res.forEach((report, index) => {
      // this.barChartData[index] = report.count;
      // this.barChartLabels[index] = report._id;

      this.totalNoOfIncident = this.totalNoOfIncident + report.count;
      this.pieChartData[index] = report.count;
      this.pieChartLabels[index] = report._id;
    });
    this.pieFlag = true;
  }

  showChart(chartType: string) {
    if (chartType == 'pie') {
      this.pieFlag = true;
      this.barFlag = false;
      this.doughntFlag = false;
      this.polarFlag = false;
    } else if (chartType == 'polar') {
      this.polarFlag = true;
      this.pieFlag = false;
      this.barFlag = false;
      this.doughntFlag = false;
    } else if (chartType == 'doug') {
      this.doughntFlag = true;
      this.pieFlag = false;
      this.barFlag = false;
      this.polarFlag = false;
    }
  }

  generateReport(month, year) {
    if (this.reportType == 'I') {
      month = 0;
      year = 0;
      this.title = 'Types of Incidents with count';
    } else {
      this.title = 'No of Incidence happen in ' + month + '-' + year + '';
    }
    this._reportService.generateReport(month, year).subscribe(res => {
      console.log(res);

      const length = res.length;

      if (length > 0) {
        this.drawChart(res);
        this.createFlag = false;
        this.doughntFlag = false;
        this.pieFlag = true;
        this.toastr.info('Report created successfully');
        this.polarFlag = false;
      } else {
        this.toastr.info('No Data found to generate report !!');
        this.createFlag = true;
        this.doughntFlag = false;
        this.pieFlag = false;
      }
    });
  }
}
