import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
 
message :string;
id :string;
buttonY :boolean;
buttonN :boolean;
header:string;

 constructor(@Inject(MAT_DIALOG_DATA) data) {
 this.message =data.msg;
 this.id =data.id;
 this.buttonY = data.buttonY;
 this.buttonN =data.buttonN;
 this.header = data.header;
}

ngOnInit() {
  
}


}
