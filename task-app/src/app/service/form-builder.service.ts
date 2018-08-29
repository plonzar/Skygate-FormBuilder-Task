import { Injectable } from '@angular/core';
import { FormControlModel } from '../model/form-control.model';
import {BaseService} from './base.service';
import { Types } from '../enums/types.enum';
import { Subject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService extends BaseService {

  mainFormsArray: FormControlModel[] = [];

  // Geting forms from DB
  getForms() {
    this.connection.select({
      from: 'Forms',
      where: {
        ParentId: -1
      }
    }).then(
      (forms) => {
        this.mainFormsArray = [];
        for (const item of forms) {
          const element: FormControlModel = this.mapFormData(item);
          this.appdendToParent(element);
          this.mainFormsArray.push(element);
        }
      }
    )
    .catch(
      (error) => {
        alert(error);
      }
    );
  }

  // Add new main form to DB
  addMainForm() {
    const value = {
      Id: 0,
      Question: '',
      Type: '',
      DisplayConditionCondition: '',
      DisplayConditionValue: '',
      ParentId: -1
    };

    this.connection.insert({
      into: 'Forms',
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

  // Add new subForm to DB
  addSubForm(parentForm: FormControlModel) {
    const value = {
      Id: 0,
      Question: '',
      Type: '',
      DisplayConditionCondition: '',
      DisplayConditionValue: parentForm.type === Types.radio ? 'yes' : '',
      ParentId: parentForm.id
    };

    this.connection.insert({
      into: 'Forms',
      values: [value],
    })
    .then(
      () => {
        this.getForms();
      }
    )
    .catch(
      (error) => {
        alert(error.message);
    });
  }

  // Remove form and all related from DB
  removeForm(form: FormControlModel) {

    const removeIdArray = this.getRemoveIdArray(form);

    this.connection.remove({
      from: 'Forms',
      where: {
        Id: {
          in: removeIdArray
        }
      }
    })
    .then(
      () => {
        this.getForms();
      }
    )
    .catch(
      (error) => {
        alert(error.message);
      }
    );
  }

  // Update form in DB
  updateForm(form: FormControlModel) {
    this.connection.update({
      in: 'Forms',
      set: {
        Question: form.question,
        Type: form.type,
        DisplayConditionCondition: form.displayCondition.condition,
        DisplayConditionValue: form.displayCondition.value
      },
      where: {
        Id: form.id
      }
    }).catch(
      () => {
        alert('Update Error');
      }
    );
  }

  getJsonString() {
   return this.connection.select({
      from: 'Forms',
    });
  }

  // Map data from indexDB to FormControlModel
  private mapFormData(formData, parentForm: FormControlModel = null) {
    const tempForm = new FormControlModel();
    tempForm.id = formData.Id;
    tempForm.question = formData.Question;
    tempForm.type = formData.Type;
    tempForm.displayCondition.condition = formData.DisplayConditionCondition;
    tempForm.displayCondition.value = formData.DisplayConditionValue;

    if (parentForm != null) {
      tempForm.parent = parentForm;
    }

    return tempForm;
  }

  // Append sub forms to parent form
  private appdendToParent(parentForm: FormControlModel) {
    this.connection.select({
      from: 'Forms',
      where: {
        ParentId: parentForm.id
      }
    })
    .then(
      (subForms) => {
        if (subForms.length > 0) {
          for (const item of subForms) {
            parentForm.childrenArray.push(this.mapFormData(item, parentForm));
          }
          for (const item of parentForm.childrenArray) {
            this.appdendToParent(item);
          }
        }
      }
    );
  }

  private getRemoveIdArray(formToRemove: FormControlModel): number[] {
    const idArray: number[] = [];
    this.getRemovedFormId(formToRemove, idArray);
    return idArray;
  }

  private getRemovedFormId(form: FormControlModel, container: number[]) {
    container.push(form.id);
    for (const subForm of form.childrenArray) {
      this.getRemovedFormId(subForm, container);
    }
  }
}
