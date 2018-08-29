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
  @ViewChild('renderArea') textArea: ElementRef;

  constructor(public formService: FormBuilderService) {
    this.formService.getForms();
   }

  ngOnInit() {
    this.formService.gettingFormsFinished.subscribe(() => {
        this.jsonString = JSON.stringify(this.formService.mainFormsArray);

        if (this.textareaHeightNotChanged) {
          this.resizeArea();
        }
      }
    );
  }

  resizeArea() {
    const overflowHeight = this.textArea.nativeElement.scrollHeight;
    this.textareaHeightNotChanged = false;
    return `${overflowHeight + 20}px`;
  }

}
