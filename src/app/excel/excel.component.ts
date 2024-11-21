import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent {
  public openUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/open';
  public saveUrl = 'https://services.syncfusion.com/angular/production/api/spreadsheet/save';
  public fileName: string | any;
  public filePath: string | any;
  public fileDetails: any;
  public fileDe: any;

  @ViewChild('default')
  public spreadsheetObj: SpreadsheetComponent | any;

  constructor(private route: ActivatedRoute, private router: Router, private dataSharing: DataServiceService) {
    this.route.queryParams.subscribe((params) => {
      if (((this.router.getCurrentNavigation()) as any).extras.state) {
        this.fileDetails = ((this.router.getCurrentNavigation()) as any).extras.state;
        if (this.fileDetails != null) {
          this.fileDe = this.fileDetails.data;
          this.fileName = this.fileDe.name;
        }
      }
    });
  }
  ngOnInit(): void {
  }

  public created(): void {
    this.spreadsheetObj.open({ file: this.fileDe });
  }

  backClickHandler(e: any): void {
    if (this.spreadsheetObj !== null) {
      this.spreadsheetObj.destroy();
    }
    const query = {
      preview: this.fileName,
      path: this.filePath
    };
    this.router.navigate([''], { relativeTo: this.route, queryParams: query });
  }
}