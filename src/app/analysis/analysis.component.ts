import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { DairyService } from '../services/dairy.service';
import { ResponseObj } from './analysis.interface';
import { UtilityService } from '../services/utility.service';
import { SettingResponse } from '../collection/customer.interface';
import { MatSnackBar } from '@angular/material';

declare var Plotly: any;

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  @ViewChild('Graph')
  private Graph: ElementRef;
  years: number[];
  graphOptions: any[] = [{ value: 1, name: 'Milk Collection' }, { value: 2, name: 'Salary' }];
  graphForm: FormGroup = new FormGroup({
    year: new FormControl('', [Validators.required]),
    graphOption: new FormControl('', [Validators.required])
  });

  constructor(private dairyService: DairyService, private utilityService: UtilityService,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.years = this.utilityService.getYears();

  }

  onClear(f: NgForm) {
    f.resetForm();
  }

  onSubmit(f: NgForm) {
    this.dairyService.getData(`/collections/getDataForGraph?year=${f.value.year}&graph=${f.value.graphOption}`)
      .subscribe(
        async (res: any[]) => {
          let data;
          let layout = {};
          if (f.value.graphOption === 1) {
            data = await this.modifyDataforSalary(res);
            if (data) {
              layout = {
                title: 'Milk Vs Month',
                barmode: 'group'
              };
              this.plotGraph(data, layout);
            } else {
              this.showSnackBar('There is no data to show Graph');
            }
          } else {
            data = this.modifyDataforMilk(res);
            if (data) {
              layout = {
                title: 'Salary Vs Month'
              };
              this.plotGraph(data, layout);
            } else {
              this.showSnackBar('There is no data to show Graph');
            }
          }
        }, () => {
          this.showSnackBar('There is some error while loading the Graph');
        });
  }


  plotGraph(data, layout) {
    Plotly.newPlot(this.Graph.nativeElement, data, layout, { responsive: true, displayModeBar: false });
  }



  modifyDataforSalary(arr: any[]) {
    return new Promise((resolve, reject) => {
      const temp = {};
      const common = [];
      const finalTrace = [];
      if (arr && arr.length > 0) {
        this.dairyService.getData('/setting').subscribe(
          (settingRes: SettingResponse) => {
            settingRes.data.forEach((o, index) => {
              temp[o.animal] = [];
              finalTrace.push({
                x: common,
                y: temp[o.animal],
                name: o.animal,
                type: 'bar'
              });
            });
            arr.forEach((obj) => {
              const month = this.utilityService.getMonth(Number(obj._id) - 1);
              common.push(month);
              obj.milk.forEach((m) => {
                temp[m.animal].push(m.quantity);
              });
            });
            resolve(finalTrace);
          }, (err) => {
            reject(null);
          }
        );
      } else {
        reject(null);
      }
    });
  }


  modifyDataforMilk(arr: ResponseObj[]) {
    const temp = {
      type: 'bar',
      x: [],
      y: []
    };
    if (arr && arr.length > 0) {
      arr.forEach((obj) => {
        const month = this.utilityService.getMonth(Number(obj._id) - 1);
        temp.x.push(month);
        temp.y.push(obj.amount);
      });
      return [temp];
    } else {
      return null;
    }
  }


  showSnackBar(msg) {
    this.snackBar.open(msg, null, {
      duration: 1000,
      verticalPosition: 'top'
    });
  }

  get year() { return this.graphForm.get('year'); }
  get graphOption() { return this.graphForm.get('graphOption'); }
}
