import { DisplayConditionModel } from './display-condition.model';

export class FormControlModel {
  id: number;
  question = '';
  type = 'text';
  displayCondition: DisplayConditionModel = new DisplayConditionModel();
  childrenArray: FormControlModel[]  = [];
  parent: FormControlModel = null;
}
