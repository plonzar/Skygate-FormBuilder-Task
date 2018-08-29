import { DisplayConditionModel } from './display-condition.model';
import { Types } from '../enums/types.enum';

export class FormControlModel
{
  Id: number;
  Question: string = "";
  Type: string = "text";
  DisplayCondition: DisplayConditionModel = new DisplayConditionModel();
  ChildrenArray: FormControlModel[]  = [];
  Parent: FormControlModel = null;
}