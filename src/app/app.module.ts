import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollectionComponent } from './collection/collection.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyOwnCustomMaterialModule } from './app.material.module';
import { CustomerComponent } from './customer/customer.component';
import { FileUploadDirective } from './shared/file-upload.directive';
import { ReportComponent } from './report/report.component';
import { DetailReportComponent } from './report/detail-report/detail-report.component';
import { BrifReportComponent } from './report/brif-report/brif-report.component';
import { SettingComponent } from './setting/setting.component';
import { ListSettingComponent } from './setting/list-setting/list-setting.component';
import { AddSettingComponent } from './setting/add-setting/add-setting.component';
import { AnalysisComponent } from './analysis/analysis.component';

import { DairyService } from './services/dairy.service';
import { UtilityService } from './services/utility.service';

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    PageNotFoundComponent,
    CustomerComponent,
    FileUploadDirective,
    ReportComponent,
    DetailReportComponent,
    BrifReportComponent,
    SettingComponent,
    ListSettingComponent,
    AddSettingComponent,
    AnalysisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [DairyService, UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
