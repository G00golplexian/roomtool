import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  passwordResetForm: UntypedFormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordResetForm = fb.group({
      email: ["", [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

}
