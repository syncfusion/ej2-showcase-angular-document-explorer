import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageEditorComponent } from './image-editor/image-editor.component';
import { LayoutComponent } from './layout/layout.component';
import {TopToolbarComponent} from './top-toolbar/top-toolbar.component';
import { PdfviewerComponent } from './pdfviewer/pdfviewer.component';
import { DocEditorComponent } from './doc-editor/doc-editor.component';
import { ExcelComponent } from './excel/excel.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent
  },
  {
    path: "imageEditor",
    component: ImageEditorComponent
  },
  {
    path: "topToolbar",
    component: TopToolbarComponent
  },
  {
    path: "pdfViewer",
    component: PdfviewerComponent
  },
  {
    path:"docEditor",
    component:DocEditorComponent
  },
  {
    path:"excel",
    component:ExcelComponent
  },
  {
    path:"about",
    component:AboutComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ImageEditorComponent, LayoutComponent,TopToolbarComponent,PdfviewerComponent,DocEditorComponent,ExcelComponent,AboutComponent]

