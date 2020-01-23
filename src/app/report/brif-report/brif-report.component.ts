import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DairyService } from '../../services/dairy.service';
import { UtilityService } from '../../services/utility.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportData, ServerResponse, Month } from '../report.model';

@Component({
  selector: 'app-brif-report',
  templateUrl: './brif-report.component.html',
  styleUrls: ['./brif-report.component.css']
})
export class BrifReportComponent implements OnInit {
  selectedMonth;
  selectedYear;
  months: Month[] = [
    { value: 0, viewValue: 'January' },
    { value: 1, viewValue: 'February' },
    { value: 2, viewValue: 'March' },
    { value: 3, viewValue: 'April' },
    { value: 4, viewValue: 'May' },
    { value: 5, viewValue: 'June' },
    { value: 6, viewValue: 'July' },
    { value: 7, viewValue: 'August' },
    { value: 8, viewValue: 'September' },
    { value: 9, viewValue: 'October' },
    { value: 10, viewValue: 'November' },
    { value: 11, viewValue: 'December' }
  ];
  years: number[];
  showReport = false;
  salaryForm: FormGroup = new FormGroup({
    month: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required])
  });


  displayedColumns: string[] = ['name', 'amount', 'more'];
  dataSource: MatTableDataSource<ReportData>;
  paginationOptions = { length: 10, pageSize: 10, pageSizeOptions: [5, 10, 25] };
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dairyService: DairyService, private router: Router,
              private route: ActivatedRoute, private snackBar: MatSnackBar,
              private utilityService: UtilityService
  ) {

  }

  ngOnInit() {
    this.years = this.utilityService.getYears();
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
    this.route.queryParams.subscribe(params => {
      if (params.month && params.year) {
        this.selectedMonth = +params.month;
        this.selectedYear = + params.year;
        this.getReports(0, this.paginationOptions.pageSize, params.month, params.year);
      }
    });
  }

  onPaginateChange(event) {
    this.getReports(event.pageIndex, event.pageSize, this.month.value, this.year.value);
  }

  onSubmit(form: NgForm) {
    this.getReports(0, this.paginationOptions.pageSize, form.value.month, form.value.year);
  }

  moreDetails(obj) {
    this.router.navigate([obj.customerId, this.month.value, this.year.value],
      {
        relativeTo: this.route,
        queryParams: { name: obj.name }
      });
  }

  getReports(pageIndex, pageSize, month, year) {
    this.dairyService.getData(`/collections?month=${month}&year=${year}&page=${pageIndex}&perPage=${pageSize}`)
      .subscribe((serverRes: ServerResponse) => {
        if (serverRes.count > 0) {
          this.showReport = true;
          this.dataSource = new MatTableDataSource(serverRes.data);
          this.paginationOptions.length = serverRes.count;
        } else {
          this.showSnackBar('There is no data available');
        }
      }, (err) => {
        this.showSnackBar('Error while fetching the Data');
      });
  }

  showSnackBar(msg) {
    this.snackBar.open(msg, null, {
      duration: 1000,
      verticalPosition: 'top'
    });
  }
  onClear(form: NgForm) {
    form.resetForm();
    this.showReport = false;
  }

  get month() { return this.salaryForm.get('month'); }
  get year() { return this.salaryForm.get('year'); }

}
