import { Component, ViewChild, } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToolbarService, FileOpenEventArgs, DetailsViewService, BeforeImageLoadEventArgs, FileManager, NavigationPaneService, FileLoadEventArgs, FileSelectionEventArgs, BeforeSendEventArgs } from '@syncfusion/ej2-angular-filemanager';
import { DataServiceService } from '../data-service.service';
import { PdfviewerComponent } from '../pdfviewer/pdfviewer.component';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [ToolbarService, DetailsViewService,]
})
export class LayoutComponent {
  constructor(private router: Router, private dataSharing: DataServiceService) { }
  @ViewChild('FileManager')
  public filemanager: FileManager | any;
  @ViewChild('PdfViewer')
  public pdfViewer: PdfviewerComponent | any;
  @ViewChild('ejDialog')
  public ejDialog: DialogComponent | any;
  public pdfviewerInstance: PdfviewerComponent | any;
  public toolbarSettings?: object;
  public contextMenuSettings?: object;
  public selectedNodes?: any;
  public ajaxSettings?: object;
  public isImageOpen: boolean = false;
  public isPdfOpen: boolean = false;
  public currentImageUrl: string | any;
  public currentUrl: string | any;
  public fileName: string | any;
  public filePath: string | any;
  public unSupportedFileName: string | any;
  public isPDF: boolean = false;
  public isUnSupported: boolean = false;
  public toolItems: string[] = ['Upload', 'SortBy', 'Refresh', 'Delete', 'Download', 'Rename', 'View', 'Details'];
  public fileMenu: string[] = ["Open", "|", "Delete", "Download", "Rename", "|", "Details"];
  public folderMenu: string[] = ["Open", "|", "Delete", "Download", "Rename", "|", "Details"];
  public layoutMenu: string[] = ["SortBy", "View", "Refresh", "|", "NewFolder", "Upload", "|", "Details", "SelectAll"];
  public fieldName: string = "";
  public treeNode: any = '1';
  public directorySize: any;
  public storageValue: any;
  public popupVisibility: string = 'e-hide-popup';
  public fileOverlayDisplay: string = 'e-file-hide-overlay';
  public sidebarToggle: boolean = false;
  public hostUrl: string = 'https://sfblazor.azurewebsites.net/documentexplorer-services/production/';
  public isProduction: any = environment.production;
  public ngOnInit(): void {
    if (this.isProduction) {
      this.toolItems = ['SortBy', 'Refresh', 'Delete', 'Download', 'Rename', 'View', 'Details'];
    }
    else {
      this.toolItems = ['Upload', 'SortBy', 'Refresh', 'Delete', 'Download', 'Rename', 'View', 'Details'];
    }
    this.ajaxSettings = {
      url: this.hostUrl + 'api/FileManager/FileOperations',
      getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
      uploadUrl: this.hostUrl + 'api/FileManager/Upload',
      downloadUrl: this.hostUrl + 'api/FileManager/Download'
    };

    this.toolbarSettings = { items: this.toolItems };
    this.contextMenuSettings = { file: this.fileMenu, folder: this.folderMenu, layout: this.layoutMenu };
  }
  public hierarchicalData: Object[] = [
    { id: '01', name: 'All Files', Icon: "sf-icon-Allfiles", select: true },
    { id: '02', name: 'Recent Files', Icon: "sf-icon-RecentFiles", select: false },
    { id: '03', name: 'Shared with me', Icon: "e-icons e-shared", select: false },
    { id: '04', name: 'Trash', Icon: "sf-icon-Delete", select: false },
    { id: '05', name: 'About', Icon: "sf-icon-About", select: false }
  ];
  public hideDialog: EmitType<object> = () => {
    this.ejDialog.hide();
  }
  public buttons: Object = [
    {
      'click': this.hideDialog.bind(this),
      buttonModel: {
        content: 'OK',
        isPrimary: true
      }
    }
  ];
  public field: Object = { dataSource: this.hierarchicalData, id: 'id', text: 'name', selected: 'select', iconCss: 'Icon' };

  public onFileOpen(args: FileOpenEventArgs): void {
    let file = (args as any).fileDetails;
    this.fileName = file.name;
    this.filePath = file.filterPath
    let path: string = file.filterPath.replace(/\\/g, "/") + this.fileName;
    if (file.isFile) {
      switch (file.type) {
        case ".jpg":
        case ".png":
        case ".dib":
        case ".jpeg":
        case ".jpe":
        case ".jfif":
        case ".gif":
        case ".tif":
        case ".tiff":
        case ".ico":
          this.isImageOpen = true;
          break;
        case ".pdf":
        case ".pptx":
          this.isPDF = true;
          this.getFileStream(path, true);
          break;
        case '.docx':
        case '.doc':
        case '.rtf':
        case '.txt':
          this.isPDF = false;
          this.getFileStream(path, false);
          break;
        case ".xlsx":
          this.getBlob(this.fileName, path);
          break;
        default:
          this.isUnSupported = true;
          this.ejDialog.show();
          this.unSupportedFileName = this.fileName;
          break;
      }
    }
  }

  public getFileStream(Path: string, isPDF: boolean) {
    let ajax: XMLHttpRequest = new XMLHttpRequest();
    ajax.open("POST", this.hostUrl + "api/FileManager/GetDocument", true);
    ajax.setRequestHeader("content-type", "application/json");
    ajax.onreadystatechange = () => {
      if (ajax.readyState === 4) {
        if (ajax.status === 200 || ajax.status === 304) {
          this.fileLoad(ajax.responseText, isPDF);
        }
      }
    };
    ajax.send(JSON.stringify({ "FileName": Path, "Action": (!isPDF ? "ImportFile" : "LoadPDF") }));
  }

  public fileLoad(response: string, isPDF: boolean): void {
    this.currentUrl = response;
    const queryParams = { url: this.currentUrl, name: this.fileName, path: this.filePath };
    this.dataSharing.dataSubject.next(this.fileName);
    if (isPDF) {
      this.router.navigate(['/pdfViewer'], { queryParams });
    }
    else {
      this.router.navigate(['/docEditor'], { queryParams });
    }
  }

  public beforeImageLoad(args: BeforeImageLoadEventArgs): void {
    if (this.isImageOpen) {
      let file = (args as any).fileDetails;
      this.currentImageUrl = args.imageUrl;
      this.fileName = file[0].name;
      this.filePath = file[0].filterPath;
      const queryParams = { imageUrl: this.currentImageUrl, name: this.fileName, path: this.filePath };
      this.dataSharing.dataSubject.next(this.fileName);
      this.router.navigate(['/imageEditor'], { queryParams });
      this.isImageOpen = false;
    }
  }

  public getBlob(fileName: string, Path: string) {
    let request: XMLHttpRequest = new XMLHttpRequest();
    request.responseType = "blob";
    request.onload = () => {
      let file: any = new File([request.response], fileName);
      this.getExcel(fileName, file);
    }
    request.open("GET", this.hostUrl + "api/FileManager/GetExcel" + "?FileName=" + Path);
    request.send();
  }

  public getExcel(fileName: string, file: object) {
    let navigationExtras: NavigationExtras = { state: { data: file } };
    this.fileName = fileName;
    this.dataSharing.dataSubject.next(this.fileName);
    this.router.navigate(['/excel'], navigationExtras);
  }

  public newClick(): void {
    this.filemanager.createFolder();
  }

  public beforeSend(args: any): void {
    var proxy = this;
    if (args.action != "upload") {
      args.ajaxSettings.beforeSend = function (args: any) {
        args.httpRequest.setRequestHeader('Authorization', proxy.fieldName);
      };
    }
  }

  public toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case 'User':
        this.popupVisibility = this.popupVisibility === 'e-hide-popup' ? 'e-show-popup' : 'e-hide-popup';
        break;
      case 'GitHub':
        window.open('https://github.com/essential-studio/ej2-angular-document-explorer', '_blank'); // Navigate to GitHub in a new tab
        break;
      default:
        break;
    }
  }

  public hamburgerClick(args: any) {
    this.sidebarToggle = !this.sidebarToggle;
  }

  public openClick(args: any) {
    this.fileOverlayDisplay = "e-file-show-overlay";
    this.sidebarToggle = true;
  }

  public closeClick(args: any) {
    this.fileOverlayDisplay = "e-file-hide-overlay";
    this.sidebarToggle = false;
  }

  public beforeDownload(args: any) {
    var proxy = this;
    if (proxy.fieldName == "Recent") {
      var modifiedPath = args.data.data[0].filterPath;
      args.data.path = modifiedPath;
    }
    
  }

  public treeSelected(args: any) {
    this.filemanager.clearSelection();
    this.filemanager.path = "/";
    this.treeNode = args.nodeData.id;
    var proxy = this.filemanager;
    var flag = false;

    switch (this.treeNode) {
      //Recent
      case "02":
        this.toolbarSettings = { items: ["Download", "Rename", "SortBy", "Refresh", "Selection", "View", "Details"], visible: true };
        this.contextMenuSettings = { file: ["Open", "|", "Delete", "Download", "Rename", "|", "Details"], folder: ["Open", "|", "Delete", "Download", "Rename", "|", "Details"], layout: ["SortBy", "View", "Refresh", "|", "NewFolder", "Upload", "|", "Details", "SelectAll"], visible: true };
        this.fieldName = "Recent";
        this.filemanager.ajaxSettings = {
          url: this.hostUrl + 'api/FileManager/FileOperations',
          getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
          downloadUrl: this.hostUrl + 'api/FileManager/Download'
        };
        break;

      //Shared With Me
      case "03":
        this.toolbarSettings = { items: ["Download", "SortBy", "Refresh", "Selection", "View", "Details"], visible: true };
        this.contextMenuSettings = { file: ["Open", "|", "Download", "|", "Details"], folder: ["Open", "|", "Download", "|", "Details"], layout: ["SortBy", "|", "View", "|", "Refresh", "|", "Details", "|", "SelectAll"], visible: true };
        this.fieldName = "Shared";
        this.filemanager.ajaxSettings = {
          url: this.hostUrl + 'api/SharedFiles/FileOperations',
          getImageUrl: this.hostUrl + 'api/SharedFiles/GetImage',
          downloadUrl: this.hostUrl + 'api/SharedFiles/Download'
        };
        break;

      //Trash
      case "04":
       
        this.toolbarSettings = { items: ["Delete", "SortBy", "Refresh", "Selection", "View", "Details"], visible: true };
        this.contextMenuSettings = { file: ["Delete", "|", "Details", "|", "Restore", "EmptyTrash", "|", "SelectAll"], folder: ["Download", "|", "Details", "|", "Restore", "EmptyTrash", "|", "SelectAll"], layout: ["SortBy", "View", "Refresh", "|", "Details", "SelectAll", "|", "Restore", "EmptyTrash"], visible: true };
        this.fieldName = "Trash";
        this.filemanager.ajaxSettings = {
          url: this.hostUrl + 'api/Trash/FileOperations',
          getImageUrl:this.hostUrl + 'api/Trash/GetImage',
        };
        break;

      //About page
      case "05":
        this.filemanager.destroy();
        this.router.navigate(['about']);
        flag = true;
        break;

      //All Files
      default:
        if (this.isProduction) {
          this.toolbarSettings = { items: ["Delete", "Download", "Rename", "SortBy", "Refresh", "Selection", "View", "Details"], visible: true };
        }
        else {
          this.toolbarSettings = { items: ["Upload", "Delete", "Download", "Rename", "SortBy", "Refresh", "Selection", "View", "Details"], visible: true };
        }
        this.contextMenuSettings = { file: ["Open", "|", "Delete", "Download", "Rename", "|", "Details"], folder: ["Open", "|", "Delete", "Download", "Rename", "|", "Details"], layout: ["SortBy", "View", "Refresh", "|", "NewFolder", "Upload", "|", "Details", "SelectAll"], visible: true };
        this.fieldName = "AllFiles";
        this.filemanager.ajaxSettings = {
          url: this.hostUrl + 'api/FileManager/FileOperations',
          getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
          uploadUrl: this.hostUrl + 'api/FileManager/Upload',
          downloadUrl: this.hostUrl + 'api/FileManager/Download'
        };
        break;
    }
    if (!flag) {
      this.filemanager.path = "/";
      this.filemanager.refresh();
    }

  }
}