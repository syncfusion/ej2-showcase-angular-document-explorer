import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  public fileName: string | any;
  constructor(private route: ActivatedRoute, private router: Router, private dataSharing: DataServiceService) { }
  ngOnInit(): void {
    this.fileName = "About";
    this.dataSharing.dataSubject.next(this.fileName);
  }

  public backClickHandler(e: any): void {
    this.router.navigate(['.']);
  }
}
