import { Injectable } from '@angular/core';
import { FormControlModel } from '../model/form-control.model';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService extends BaseService {

  constructor() {
    super();
   }

private formsIdCounter = 0;
mainFormsArray: FormControlModel[] = [];

  //Geting forms from DB
  getForms() {
    this.connection.select({
      from: 'Forms',
      where: {
        ParentId: -1
      }
    }).then(
      (forms) => {
        this.mainFormsArray = [];
        for(let item of forms){
          this.mainFormsArray.push(this.mapFormData(item));
        }
        for(let item of this.mainFormsArray){
          this.appdendToParent(item);
        }
      }
    )
    .catch(
      (error) => {
        alert(error);
      }
    )
  }

  //Add new main form to DB
  addMainForm(){
    let value = {
      Id: 0,
      Question: "",
      Type: "",
      DisplayConditionCondition: "",
      DisplayConditionValue: "",
      ParentId: -1
    };

    this.connection.insert({
      into: "Forms",
      values: [value],
    })
    .then(
      () => {
        this.getForms();
      }
    ).catch(function(error) {
        alert(error.message);
    });
  }

  //Add new subForm to DB
  addSubForm(parentForm: FormControlModel){
    let value = {
      Id: 0,
      Question: "",
      Type: "",
      DisplayConditionCondition: "",
      DisplayConditionValue: "",
      ParentId: parentForm.Id
    };

    this.connection.insert({
      into: "Forms",
      values: [value],
    })
    .then(
      () =>{
        this.getForms();
      }
    )
    .catch(
      (error) => {
        alert(error.message);
    });
  }

  //remove form and all related from DB
  removeForm(formId: number){
    this.connection.remove({
      from: 'Forms',
      where: {
        Id: formId,
        or: {
          ParentId: formId
        }
      }
    })
    .then(
      () => {
        console.log("DELETE OK!");
        this.getForms();
      }
    )
    .catch(
      (error) => {
        alert(error.message);
      }
    );
  }

  //update form in DB
  updateForm(form: FormControlModel){
    this.connection.update({
      in: 'Forms',
      set: {
        Question: form.Question,
        Type: form.Type,
        DisplayConditionCondition: form.DisplayCondition.condition,
        DisplayConditionValue: form.DisplayCondition.value
      },
      where: {
        Id: form.Id
      }
    }).then(
      () => {
        console.log("Update Successful");
      }
    ).catch(
      () => {
        console.log("update error");
      }
    );
  }

  //map data from indexDB to FormControlModel
  private mapFormData(formData, parentForm: FormControlModel = null){
    let tempForm = new FormControlModel();
    tempForm.Id = formData.Id;
    tempForm.Question = formData.Question;
    tempForm.Type = formData.Type
    tempForm.DisplayCondition.condition = formData.DisplayConditionCondition;
    tempForm.DisplayCondition.value = formData.DisplayConditionValue;

    if(parentForm != null){
      tempForm.Parent = parentForm;
    }

    return tempForm;
  }

  //append sub forms to parent form
  private appdendToParent(parentForm: FormControlModel){
    this.connection.select({
      from: 'Forms',
      where: {
        ParentId: parentForm.Id
      }
    })
    .then(
      (subForms) => {
        if(subForms.length > 0){
          for(let item of subForms){
            parentForm.ChildrenArray.push(this.mapFormData(item, parentForm));
          }
          for(let item of parentForm.ChildrenArray){
            this.appdendToParent(item);
          }
        }
      }
    );
  }
}
//class end
