import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CollectionData, AdminService } from '../../../services/admin.service';
import { AppFacade } from '../../../../+state';
import { AdminFacade } from '../../../+state';

@Component({
  selector: 'marrick-admin',
  templateUrl: './admin.container.html'
})
export class AdminContainerComponent {
  collections$: BehaviorSubject<Array<CollectionData>>;

  constructor(
    private app: AppFacade,
    public admin: AdminFacade,
    private adminService: AdminService
  ) {
    this.collections$ = this.adminService.collections$;
  }

  onRetrieve(col: CollectionData) {
    this.admin.retrieve(col);
  }

  onLoad(col: CollectionData) {
    const file: File = null;
    this.admin.loadCollection(file);
  }

  onRetrieveAll() {
    this.admin.retrieveAll({
      title: 'Retrieve All Collections',
      message: 'Are you sure you want to retrieve all Collections?'
    });
  }

  onSave(collection: CollectionData) {
    this.admin.save(collection);
  }

  onSaveAll() {
    this.admin.saveAll({
      title: 'Save All Collections',
      message: 'Are you sure you want to save all Collections?'
    });
  }

  onPersist(collection: CollectionData) {
    this.admin.persist(collection);
  }

  onPersistAll() {
    this.admin.persistAll({
      title: 'Persist All Collections',
      message: 'Are you sure you want to persist all Collections?'
    });
  }

  filesValid(files: Array<File>) {
    files.map(file => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = e => {
        const data = JSON.parse(reader.result.toString());
        // the name of the collection is assumed to be the filename without .json extension.
        const collection = file.name
          .split('_')
          .slice(0, -1)
          .join('_');
        if (
          !this.adminService.updateCollections(collection, data, false, true)
        ) {
          this.invalidFile(file.name);
        }
      };
    });
  }

  invalidFile(fileName: string) {
    // const snackBarInfo: SnackBarInfo = {
    //   message: `Invalid File ${fileName}`,
    //   duration: 3000,
    //   action: 'OK'
    //   // style: ['error-text']
    // };
    // this.app.showSnackbar(snackBarInfo);
  }

  analyze(collection: CollectionData) {
    this.admin.analyze(collection);
  }

  analyzeAll() {
    this.admin.analyzeAll();
  }

  elasticInsert(collection: CollectionData) {
    this.admin.elasticInsert(collection);
  }

  elasticBulk(collection: CollectionData) {
    if (collection.data && collection.data.map) {
      this.admin.elasticBulk(collection);
    }
  }

  elasticDelete(collection: CollectionData) {
    this.admin.elasticDelete(collection);
  }
}
