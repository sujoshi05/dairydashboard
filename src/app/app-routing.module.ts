import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomerComponent } from './customer/customer.component';
import { ReportComponent } from './report/report.component';
import { DetailReportComponent } from './report/detail-report/detail-report.component';
import { BrifReportComponent } from './report/brif-report/brif-report.component';
import { SettingComponent } from './setting/setting.component';
import { AddSettingComponent } from './setting/add-setting/add-setting.component';
import { ListSettingComponent } from './setting/list-setting/list-setting.component';
import {AnalysisComponent} from './analysis/analysis.component';

const routes: Routes = [
  { path: '', redirectTo: '/collection', pathMatch: 'full' },
  { path: 'collection', component: CollectionComponent },
  { path: 'customer', component: CustomerComponent },
  {
    path: 'report', component: ReportComponent,
    children: [
      { path: '', component: BrifReportComponent },
      { path: ':customer_id/:month/:year', component: DetailReportComponent }]
  },
  {
    path: 'setting', component: SettingComponent,
    children: [
      { path: '', component: ListSettingComponent },
      { path: 'addEdit', component: AddSettingComponent }]
  },
  {
    path: 'analysis', component: AnalysisComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
