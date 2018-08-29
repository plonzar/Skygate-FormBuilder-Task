import { FormBuilderService } from './../../service/form-builder.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent implements OnInit {

  constructor(public formService: FormBuilderService) { }

  ngOnInit() {
    this.formService.getForms();
  }

}
