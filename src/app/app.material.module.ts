import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,
  MatTableModule,
   MatPaginatorModule,
   MatAutocompleteModule,
   MatToolbarModule,
   MatIconModule,
   MatSidenavModule,
   MatListModule,
   MatSnackBarModule
} from '@angular/material';

const importExport = [MatInputModule, MatButtonModule, MatDatepickerModule, MatListModule,
  MatSelectModule, MatNativeDateModule, MatToolbarModule, MatIconModule, MatSnackBarModule,
  MatTableModule, MatPaginatorModule, MatAutocompleteModule, MatSidenavModule
];

@NgModule({
  imports: importExport,
  exports: importExport
})
export class MyOwnCustomMaterialModule {

}
