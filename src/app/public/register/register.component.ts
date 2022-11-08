import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: UntypedFormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = fb.group({
      email: ["", Validators.required, Validators.email],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["", Validators.required],
      password2: ["", Validators.required],
    })
  }

  ngOnInit(): void {
  }

}