import { FormBuilderService } from './../../service/form-builder.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  constructor(public fromBuildService: FormBuilderService) { }
  ngOnInit() {
    this.fromBuildService.getForms();
  }

  addInput() {
    this.fromBuildService.addMainForm();
  }


}
