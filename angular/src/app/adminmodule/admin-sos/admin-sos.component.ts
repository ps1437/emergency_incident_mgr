import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Router } from '@angular/router';
import { SOSModel } from '../../models/sos.model';
import { SosService } from '../services/sos.service';
import { DialogBoxComponent } from '../../common_module/body/popupbox/dialog-box.component';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../../common_module/services/excel.service';
import { flyin } from '../../common_module/animations/animatation';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-sos',
  templateUrl: './admin-sos.component.html',
  styleUrls: ['./admin-sos.component.css'],
  animations: [flyin]
})
export class AdminSosComponent implements OnInit {
  displayedColumns: string[] = [
    'sos_id',
    'sos_name',
    'sos_des',
    'sos_owner',
    'sos_emailId',
    'created_date',
    'action'
  ];
  addFlag: boolean = false;
  bounce: any;
  count: number;
  isLoading: boolean = false;
  selectedIncident: SOSModel;
  sosListModel: SOSModel[];
  dataSource = new MatTableDataSource<SOSModel>();
  @ViewChild('addSosService') updtForm;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private _sso_service: SosService,
    private toastr: ToastrService,
    private excelService: ExcelService,
    private spinner: NgxSpinnerService
  ) {
    this.loadData();
  }

  ngOnInit() {
    this.isLoading = true;
  }

  swap() {
    this.addFlag = !this.addFlag;
  }

  loadData() {
    this.spinner.show();
    this._sso_service.getServcies().subscribe(res => {
      this.sosListModel = res;
      this.count = this.sosListModel.length;
      this.dataSource = new MatTableDataSource<SOSModel>(this.sosListModel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      this.spinner.hide();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteService(sos_id: string) {
    this.dialog
      .open(DialogBoxComponent, {
        data: {
          id: '',
          msg: 'Are you sure you delete the service with id :' + sos_id + ' ?',
          buttonY: true,
          buttonN: true,
          header: 'Services'
        }
      })
      .afterClosed()
      .subscribe(res => {
        if (res == 'Y') {
          this._sso_service.deleteService(sos_id).subscribe(
            res => {
              this.toastr.success('Service deleted sucessfully');
            },
            err => {
              this.toastr.warning('Failed to delete ,Please try again !!');
            }
          );
          this.loadData();
        }
      });
  }

  addService(sosModel: SOSModel, form: NgForm) {
    this.dialog
      .open(DialogBoxComponent, {
        data: {
          id: '',
          msg: 'Are you sure you add a service ?',
          buttonY: true,
          buttonN: true,
          header: 'Services'
        }
      })
      .afterClosed()
      .subscribe(res => {
        if (res == 'Y') {
          this._sso_service.addservice(sosModel).subscribe(
            res => {
              console.log(res);
              this.toastr.success(res.message);
              this.updtForm.resetForm();
              form.reset();
              this.loadData();
            },
            err => {
              this.toastr.success('Something went wrong,Try again');
              console.log('Error occured');
            }
          );
        }
      });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.sosListModel, 'SOS_Services');
  }
}
