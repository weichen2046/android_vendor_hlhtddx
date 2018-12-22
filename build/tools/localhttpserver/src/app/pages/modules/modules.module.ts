import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { ModuleDetailComponent } from './module-detail/module-detail.component';
import { ModulesService } from './modules.service';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';

@NgModule({
  declarations: [ModulesComponent, ModuleDetailComponent, LoadingDialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ModulesRoutingModule
  ],
  entryComponents: [LoadingDialogComponent],
  providers: [ModulesService]
})
export class ModulesModule { }
