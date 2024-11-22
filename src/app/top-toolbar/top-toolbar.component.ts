import { Component, Output, EventEmitter } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent {
  @Output() backClick: EventEmitter<string> = new EventEmitter<string>();
  public rootFileName: string = '';

  constructor(private dataSharing: DataServiceService) {
    this.dataSharing.dataSubject.subscribe((name) => {
      if (name != null) {
        this.rootFileName = name;
      }
    });
  }

  async onBackClick(): Promise<void> {
    await this.backClick.emit('Back');
  }
}
