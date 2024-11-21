import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ToolbarService, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
  NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService
} from '@syncfusion/ej2-angular-pdfviewer';

@Component({
  selector: 'app-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrls: ['./pdfviewer.component.css'],
  providers: [ToolbarService, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService]
})
export class PdfviewerComponent {
  public fileName: string | any;
  public filePath: string | any;
  public fileUrl: string = '';
  public resourceUrl = 'https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib';
  @ViewChild('PdfViewer')
  public pdfviewerInstance: PdfviewerComponent | any;

  constructor(private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {
  }

  public created(): void {
    let pdfviewer = (<any>document.getElementById('pdfviewer')).ej2_instances[0];
    this.route.queryParams.subscribe((params: { [x: string]: any; }) => {
      this.fileUrl = params['url'];
      this.fileName = params['name'];
      this.filePath = params['path'];
      if (this.fileUrl) {
        setTimeout(() => { pdfviewer.load(this.fileUrl) }, 5000);
      }
    });
  }

  public documentLoad(args: any): void{
    let file= (args.documentName === 'undefined.pdf')?this.fileName : args.documentName;
    var fileExtension = file.split('.').pop();    
    this.pdfviewerInstance.downloadFileName = (fileExtension=="pptx")? file.replace(/\.[^.]+$/, '.pdf') : file;    
  }

  backClickHandler(e: any): void {
    if (this.pdfviewerInstance !== null) {
      this.pdfviewerInstance.destroy();
    }
    const query = {
      preview: this.fileName,
      path: this.filePath
    };
    this.router.navigate([''], { relativeTo: this.route, queryParams: query });
  }
}
