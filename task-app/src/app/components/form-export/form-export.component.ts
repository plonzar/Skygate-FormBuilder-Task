import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilderService } from '../../service/form-builder.service';

@Component({
  selector: 'app-form-export',
  templateUrl: './form-export.component.html',
  styleUrls: ['./form-export.component.css']
})
export class FormExportComponent implements OnInit {

  jsonString: string;
  textareaHeightNotChanged = true;

  constructor(public formService: FormBuilderService) {
    this.formService.getForms();
   }

  ngOnInit() {
    this.formService.getJsonString().then((data) => {
        this.jsonString = JSON.stringify(data);
      }
    );
  }

}
