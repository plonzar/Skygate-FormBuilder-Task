import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormControlEditorComponent } from './components/form-control-editor/form-control-editor.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';

import { FormBuilderService } from './service/form-builder.service';
import { IdbService } from './service/idb.service';

@NgModule({
  declarations: [
    AppComponent,
    FormControlEditorComponent,
    FormBuilderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [FormBuilderService, IdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
