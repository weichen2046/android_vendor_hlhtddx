import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ModulesService } from './modules.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  myControl = new FormControl();
  moduleNames: string[] = [];

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

      this.moduleNames = this.modulesSrv.getModuleNames();
    });
  }

  private showLoadingDataDialog() {
    this.loadingDialogRef = this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
    });
  }

}
