import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { DairyService } from '../services/dairy.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private dairyService: DairyService, private snackBar: MatSnackBar) { }

  get first_name() { return this.customerForm.get('first_name'); }
  get last_name() { return this.customerForm.get('last_name'); }
  get address() { return this.customerForm.get('address'); }
  get aadhaar_no() { return this.customerForm.get('aadhaar_no'); }
  get mobile() { return this.customerForm.get('mobile'); }
  avatar: File = null;

  customerForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
    address: new FormControl('', [Validators.pattern(/^[a-zA-Z0-9\s,'.-]*$/)]),
    aadhaar_no: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/), Validators.min(100000000000)]),
    mobile: new FormControl('', [Validators.required, Validators.pattern(/^[7-9]\d{9}$/)])
  });
  allowedExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    const formData: FormData = new FormData();
    formData.append('first_name', this.customerForm.value.first_name);
    formData.append('last_name', this.customerForm.value.last_name);
    formData.append('address', this.customerForm.value.address);
    formData.append('aadhaar_no', this.customerForm.value.aadhaar_no);
    formData.append('mobile', this.customerForm.value.mobile);
    if (this.avatar) {
      formData.append('avatar', this.avatar, this.avatar.name);
    }
    this.dairyService.postData('/customers', formData).subscribe(
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
    this.avatar = null;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.avatar = event.target.files.item(0);
      if (this.allowedExtension.indexOf(this.avatar.type) > -1) {
      } else {
        this.showSnackBar('Please select valid file type');
        this.avatar = null;
      }
    }
  }
}

