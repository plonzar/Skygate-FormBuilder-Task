import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route} from '@angular/router';

import { AppComponent } from './app.component';
import { FormControlEditorComponent } from './components/form-control-editor/form-control-editor.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormElementComponent } from './components/form-element/form-element.component';
import { FormPreviewComponent } from './components/form-preview/form-preview.component';
import { FormExportComponent } from './components/form-export/form-export.component';

import { FormBuilderService } from './service/form-builder.service';
import { IdbService } from './service/idb.service';


const routes: Route[] = [
  {path: 'create', component: FormBuilderComponent},
  {path: 'export', component: FormExportComponent},
  {path: 'preview', component: FormPreviewComponent},
  {path: '**', redirectTo: 'create'}
];


@NgModule({
  declarations: [
    AppComponent,
    FormControlEditorComponent,
    FormBuilderComponent,
    FormElementComponent,
    FormPreviewComponent,
    FormExportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [FormBuilderService, IdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
