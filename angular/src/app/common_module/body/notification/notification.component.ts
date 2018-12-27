import { Component, OnInit, ViewChild } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { NotifyModel } from "./../../../models/notify.model";
import { ToastrService } from "ngx-toastr";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { DialogBoxComponent } from "../popupbox/dialog-box.component";
import { AuthService } from "../../../authmodule/services/auth.service";
import { flyFromBottom, rotateIn } from '../../../common_module/animations/animatation';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"],
  animations: [flyFromBottom, rotateIn]
})
export class NotificationComponent implements OnInit {
  @ViewChild('notification') notificationForm;
  notificationList: NotifyModel[];
  notification: NotifyModel;
  panelOpenState = false;
  flag: boolean = false;
  userType: boolean = false;
  constructor(
    private _notificaitonService: NotificationService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private authService: AuthService,
    private snipper: NgxSpinnerService
  ) { }

  swap() {
    this.flag = !this.flag;
  }
  ngOnInit() {
    this.snipper.show();
    this.loadNotifications();
    const tokenData = this.authService.getTokenData();
    const user = tokenData.userType;

    if (user == "S") {
      this.userType = true;
    }
  }

  loadNotifications() {
    this._notificaitonService.getNotifications().subscribe(res => {
      this.notificationList = res;
      this.snipper.hide();
    });
  }

  createNotification(body: NotifyModel, notification: NgForm) {
    body.createdBy = localStorage.getItem("userName");

    if (null == body.createdBy) {
      body.createdBy = "NONE";
    }
    this.dialog
      .open(DialogBoxComponent, {
        data: {
          id: "",
          msg: "Are you sure you publish a notification?",
          buttonY: true,
          buttonN: true,
          header: "Notifications"
        }
      })
      .afterClosed()
      .subscribe(res => {
        if (res == "Y") {
          this._notificaitonService.createNotification(body).subscribe(res => {
            const message = res.message;
            const flag = res.status;

            if (flag) {
              this.notificationForm.resetForm();
              this.toastr.success(message);
              notification.reset();
            } else {
              this.toastr.warning("Something went wrong");
            }
          });
        }
      });
  }
}
