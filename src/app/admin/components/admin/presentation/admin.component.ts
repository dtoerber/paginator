import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { CollectionData } from '../../../services/admin.service';

@Component({
  selector: 'marrick-admin-ui',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  @Input()
  roles: Array<string>;
  @Input()
  collections: Array<CollectionData>;

  @Output()
  retrieve: EventEmitter<CollectionData> = new EventEmitter();
  @Output()
  load: EventEmitter<CollectionData> = new EventEmitter();
  @Output()
  retrieveAll: EventEmitter<string> = new EventEmitter();
  @Output()
  save: EventEmitter<CollectionData> = new EventEmitter();
  @Output()
  saveAll: EventEmitter<string> = new EventEmitter();
  @Output()
  persist: EventEmitter<CollectionData> = new EventEmitter();
  @Output()
  persistAll: EventEmitter<string> = new EventEmitter();
  @Output()
  filesValid: EventEmitter<File> = new EventEmitter();
  @Output()
  filesInvalid: EventEmitter<File> = new EventEmitter();
  @Output()
  analyze: EventEmitter<CollectionData> = new EventEmitter();
  @Output()
  analyzeAll: EventEmitter<void> = new EventEmitter();
  @Output()
  insert: EventEmitter<void> = new EventEmitter();
  @Output()
  delete: EventEmitter<void> = new EventEmitter();

  uploading = false;

  isAdmin(): boolean {
    return this.roles.includes('admin');
  }

  getExpansionHeading(collection: CollectionData) {
    if (collection && collection.data && collection.data.length >= 0) {
      return `${collection.name} (${collection.data.length})`;
    } else {
      return `${collection.name}`;
    }
  }
}
