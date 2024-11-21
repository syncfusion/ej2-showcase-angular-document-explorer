import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileManager } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css']
})
export class ImageEditorComponent {
  public fileName: string | any;
  public filePath: string | any;
  @ViewChild('ImageEdit')
  public imageEditorInstance: ImageEditorComponent | any;
  @ViewChild('FileManager')
  public fileManager: FileManager | any;

  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
  }

  public created(): void {
    let image = (<any>document.getElementById('image')).ej2_instances[0];
    this.route.queryParams.subscribe((params: { [x: string]: any; }) => {
      const imageUrl = params['imageUrl'];
      this.fileName = params['name'];
      this.filePath = params['path'];
      if (imageUrl) {
        image.open(imageUrl);
      }
    });
  }

  public beforeSave(args: any): void {
    let newFileName = (args.fileName).startsWith('Get') ? this.fileName : args.fileName;
    const fileNameWithoutExtension = newFileName.replace(/\.[^/.]+$/, '');
    args.fileName = fileNameWithoutExtension;
  }

  backClickHandler(e: any): void {
    if (this.imageEditorInstance !== null) {
      this.imageEditorInstance.destroy();
    }
    const query = {
      preview: this.fileName,
      path: this.filePath
    };
    this.router.navigate([''], { relativeTo: this.route, queryParams: query });
  }
}
