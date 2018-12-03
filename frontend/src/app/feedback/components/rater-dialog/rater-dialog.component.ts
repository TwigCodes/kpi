import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Employee } from '@app/feedback/feedback.model';
import { namePattern, emailPattern } from '@app/core/util/regex.util';

@Component({
  selector: 'nwcdkpi-rater-dialog',
  templateUrl: './rater-dialog.component.html',
  styleUrls: ['./rater-dialog.component.scss']
})
export class RaterDialogComponent implements OnInit {
  isAdd = true;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      rater: Partial<Employee>;
    },
    private dialogRef: MatDialogRef<RaterDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isAdd = this.data.rater.id === undefined;
    const rater = this.data.rater;
    this.form = this.fb.group({
      name: [
        rater.name ? rater.name : '',
        [Validators.required, Validators.pattern(namePattern)]
      ],
      email: [
        rater.email ? rater.email : '',
        [Validators.required, Validators.pattern(emailPattern)]
      ],
      gender: [rater.gender ? rater.gender : false]
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const rater: Partial<Employee> = { ...this.form.value };
    this.dialogRef.close(rater);
  }
}
