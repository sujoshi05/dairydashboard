import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { DairyService } from '../../services/dairy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-setting',
  templateUrl: './add-setting.component.html',
  styleUrls: ['./add-setting.component.css']
})
export class AddSettingComponent implements OnInit {
  id: string;
  animalForm: FormGroup = new FormGroup({
    animal: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
    rate: new FormControl('', [Validators.required, Validators.pattern(/^\d/), Validators.min(1), Validators.max(500)])
  });
  constructor(private dairyService: DairyService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.id = params.id;
        this.animalForm.patchValue({ animal: params.animal, rate: params.rate });
      }
    });
  }

  onSubmit(form) {
    if (this.id) {
      const data = form.value;
      data.id = this.id;
      this.dairyService.putData('/setting', form.value).subscribe(
        (res) => {
          this.redirect();
        },
        (err) => {
          this.showSnackBar('Error while saving the Data');
        });
    } else {
      this.dairyService.postData('/setting', form.value).subscribe(
        (res) => {
          this.redirect();
        },
        (err) => {
          this.showSnackBar('Error while saving the Data');
        });
    }

  }

  showSnackBar(msg) {
    this.snackBar.open(msg, null, {
      duration: 1000,
      verticalPosition: 'top'
    });
  }
  redirect() {
    this.router.navigate(['setting']);
  }

  get animal() { return this.animalForm.get('animal'); }
  get rate() { return this.animalForm.get('rate'); }
}
