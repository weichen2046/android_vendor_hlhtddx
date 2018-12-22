import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../modules.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';


@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss']
})
export class ModuleDetailComponent implements OnInit {

  private timeoutId;
  private loadingDialogRef: MatDialogRef<LoadingDialogComponent>;

  constructor(
    private dialog: MatDialog,
    private modulesSrv: ModulesService,
  ) { }

  ngOnInit() {
    this.timeoutId = setTimeout(this.showLoadingDataDialog.bind(this), 500);
    this.modulesSrv.loadDataFile().subscribe(result => {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
      if (this.loadingDialogRef) {
        this.loadingDialogRef.close();
      }
    });
  }

  private showLoadingDataDialog() {
    this.loadingDialogRef = this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
    });
  }

}
