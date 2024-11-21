import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { ToolbarModule,SidebarModule,TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'; 
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { ImageEditorComponent } from './image-editor/image-editor.component';
import { ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { PdfViewerModule} from '@syncfusion/ej2-angular-pdfviewer';
import { PdfviewerComponent } from './pdfviewer/pdfviewer.component';
import { DocEditorComponent } from './doc-editor/doc-editor.component';
import { DocumentEditorModule, DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';
import { ExcelComponent } from './excel/excel.component';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import { AboutComponent } from './about/about.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ImageEditorComponent,
    TopToolbarComponent,
    PdfviewerComponent,
    DocEditorComponent,
    ExcelComponent,
    AboutComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    SidebarModule,
    ButtonModule,
    TreeViewModule,
    FileManagerModule,
    ImageEditorModule,
    PdfViewerModule,
    DocumentEditorModule,
    DocumentEditorContainerModule,
    SpreadsheetAllModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
