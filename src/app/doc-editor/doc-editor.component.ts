import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  ToolbarService} from '@syncfusion/ej2-angular-documenteditor';

@Component({
  selector: 'app-doc-editor',
  templateUrl: './doc-editor.component.html',
  styleUrls: ['./doc-editor.component.css'],
  providers: [ToolbarService]
})
export class DocEditorComponent {
  public fileName: string | any;
  public filePath: string | any;
  public fileUrl: string = '';

  @ViewChild('documenteditor')
  public docEditorInstance: DocEditorComponent | any;

  constructor(private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {
  }
  public created(): void {
    this.route.queryParams.subscribe((params: { [x: string]: any; }) => {
      this.fileUrl = params['url'];
      this.fileName = params['name'];
      this.filePath = params['path'];
      if (this.fileUrl) {
        setTimeout(() => { this.docEditorInstance.documentEditor.open(this.fileUrl) }, 5000);
      }
    });
  }

  backClickHandler(e: any): void {
    if (this.docEditorInstance !== null) {
      this.docEditorInstance.destroy();
    }
    const query = {
      preview: this.fileName,
      path: this.filePath
    };
    this.router.navigate([''], { relativeTo: this.route, queryParams: query });
  }
}