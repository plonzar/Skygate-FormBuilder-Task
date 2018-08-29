import { Conditions } from './../../enums/conditions.enum';
import { FormControlModel } from './../../model/form-control.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.css']
})
export class FormElementComponent {

  @Input() formControlElement: FormControlModel;
  @Input() parentAnswer;
  answer: any;

  hideElement(): boolean {

    if (this.formControlElement.parent == null) {
      return false;
    }

    switch (this.formControlElement.displayCondition.condition) {
      case Conditions['Equals']:
        if (this.formControlElement.displayCondition.value === this.parentAnswer) {
          return false;
        }
        break;
      case Conditions['Greater than']:
        if (this.formControlElement.displayCondition.value < this.parentAnswer) {
          return false;
        }
        break;
      case Conditions['Less than']:
        if (this.formControlElement.displayCondition.value > this.parentAnswer) {
          return false;
        }
        break;
      default:
        return false;
    }

    return true;
  }

}

