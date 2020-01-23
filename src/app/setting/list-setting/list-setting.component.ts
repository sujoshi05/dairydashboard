import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DairyService } from '../../services/dairy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {ServerResponse, RateData} from '../setting.model';


@Component({
  selector: 'app-list-setting',
  templateUrl: './list-setting.component.html',
  styleUrls: ['./list-setting.component.css']
})
export class ListSettingComponent implements OnInit {
  showData = false;
  displayedColumns: string[] = ['animal', 'rate', 'edit'];
  dataSource: MatTableDataSource<RateData>;
  paginationOptions = { length: 10, pageSize: 10, pageSizeOptions: [5, 10, 25] };
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dairyService: DairyService, private router: Router,
              private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSettingData(0, this.paginationOptions.pageSize);
  }

  onPaginateChange(event) {
    this.getSettingData(event.pageIndex, event.pageSize);
  }

  editRate(row) {
    let queryParams = {};
    if (row) {
      queryParams = { id: row._id, animal: row.animal, rate: row.rate };
    }
    this.router.navigate(['setting', 'addEdit'], { queryParams });
  }


  getSettingData(pageIndex, pageSize) {
    this.dairyService.getData(`/setting?page=${pageIndex}&perPage=${pageSize}`)
      .subscribe((serverRes: ServerResponse) => {
        if (serverRes.count > 0) {
          this.showData = true;
          this.dataSource = new MatTableDataSource(serverRes.data);
          this.paginationOptions.length = serverRes.count;
        } else {
          this.showSnackBar('There is no data to display');
        }
      }, (err) => {
        this.showSnackBar('Something went wrong while getting the data');
      });
  }


  showSnackBar(msg) {
    this.snackBar.open(msg, null, {
      duration: 1000,
      verticalPosition: 'top'
    });
  }
}
