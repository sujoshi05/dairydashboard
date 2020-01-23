import { Component, OnInit, ViewChild } from '@angular/core';
import { DairyService } from '../../services/dairy.service';
import { UtilityService } from '../../services/utility.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailReportData, DetailServerResponse } from '../report.model';
@Component({
  selector: 'app-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css']
})


export class DetailReportComponent implements OnInit {
  title: string;
  month: string;
  year: string;
  displayedColumns: string[] = ['Date', 'Animal', 'Quantity', 'Quality', 'Rate', 'Amount'];
  dataSource: DetailReportData[];
  paginationOptions = { length: 10, pageSize: 10, pageSizeOptions: [10] };
  monthRef = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sept',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
  };
  constructor(private dairyService: DairyService, private route: ActivatedRoute,
              private router: Router, private utilityService: UtilityService,
              private snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.month = this.route.snapshot.params.month;
    this.year = this.route.snapshot.params.year;
    this.route.queryParams.subscribe(params => {
      const month = this.utilityService.getMonth(this.month);
      if (params.name && month) {
        this.title = `${params.name} (${month} ${this.year})`;
      }
    });

    this.getReports(0, this.paginationOptions.pageSize, this.month, this.year);
  }

  onPaginateChange(event) {
    this.getReports(event.pageIndex, event.pageSize, this.month, this.year);
  }
  getReports(pageIndex, pageSize, month, year): any {
    // tslint:disable-next-line
    this.dairyService.getData(`/collections/get_customer_details/${this.route.snapshot.params.customer_id}/${month}/${year}?page=${pageIndex}&perPage=${pageSize}`)
      .subscribe((serverRes: DetailServerResponse) => {
        this.dataSource = serverRes.data;
        this.paginationOptions.length = serverRes.count;
      }, (err) => {
        this.showSnackBar('Error while getting the Data');
      });
  }

  back() {
    this.router.navigate(['/report'], {
      queryParams: { month: this.month, year: this.year }
    });
  }

  showSnackBar(msg) {
    this.snackBar.open(msg, null, {
      duration: 1000,
      verticalPosition: 'top'
    });
  }

}

