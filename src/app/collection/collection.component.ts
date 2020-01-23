import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DairyService } from '../services/dairy.service';
import { Customer, SettingResponse} from './customer.interface';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  options: Customer[] = [];
  filteredOptions: Observable<Customer[]>;
  animals = [];
  date = new Date();
  collectionForm: FormGroup = new FormGroup({
    customerName: new FormControl('', [Validators.required, Validators.min(1)]),
    date: new FormControl({ value: new Date() }, [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    quality: new FormControl('', [Validators.required, Validators.min(1)]),
    rate: new FormControl('', [Validators.required, Validators.min(1)]),
    animal: new FormControl('', Validators.required),
    comment: new FormControl('')
  });

  constructor(private dairyService: DairyService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dairyService.getData('/customers').subscribe(
      (customerRes: Customer[]) => {
        this.options = customerRes;
        this.filteredOptions = this.customerName.valueChanges
          .pipe(
            startWith<any>(''),
            map(value => {
              if (value && typeof value === 'string') {
                return value;
              } else if (value) {
                return value.name;
              } else {
                return '';
              }
            }),
            map(name => name ? this._filter(name) : this.options.slice())
          );
      }, (err) => {
        this.showSnackBar('Error while getting the Data');
      }
    );

    this.dairyService.getData('/setting').subscribe(
      (settingRes: SettingResponse) => {
        this.animals = settingRes.data;
      }, (err) => {
        this.showSnackBar('Error while getting the Animals');
      }
    );

    this.collectionForm.patchValue({
      date: new Date()
    });
  }

  displayFn(customer?: Customer): string | undefined {
    return customer ? customer.name : undefined;
  }
  private _filter(name: string): Customer[] {
    if (name) {
      const filterValue = name.toLowerCase();
      return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return [];
    }

  }

  onSubmit(form: NgForm) {
    form.value.customerName = form.value.customerName._id;
    form.value.date = new Date(form.value.date).getTime();
    this.dairyService.postData('/collections', form.value).subscribe(
      (res) => {
        this.showSnackBar('Data Saved');
        this.onClear(form);
      },
      (err) => {
        this.showSnackBar('Error while saving the Data');
      }
    );
  }

  showSnackBar(msg) {
    this.snackBar.open(msg, null, {
      duration: 1000,
      verticalPosition: 'top'
    });
  }
  onClear(form: NgForm) {
    form.resetForm();
    this.collectionForm.patchValue({
      date: new Date()
    });
  }

  onAnimalChange(event) {
    this.animals.forEach((data) => {
      if (event.value === data.animal) {
        this.collectionForm.patchValue({ rate: data.rate });
      }
    });
  }

  get customerName() { return this.collectionForm.get('customerName'); }
  get quantity() { return this.collectionForm.get('quantity'); }
  get quality() { return this.collectionForm.get('quality'); }
  get rate() { return this.collectionForm.get('rate'); }
  get animal() { return this.collectionForm.get('animal'); }
}
