import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["", Validators.required],
      password2: ["", Validators.required],
    })
  }

  ngOnInit(): void {
  }

  register()
  {
    if(this.registerForm.valid && this.registerForm.get("password")?.value === this.registerForm.get("password2")?.value)
    {
      const _user = new User(this.registerForm.value);
      this.api.postUser(_user, this.registerForm.get("password")?.value).subscribe(res => {
        if(!res?.error)
        {
          this.snack.open("Der Account wurde erstellt. Du kannst dich nun einloggen.", undefined, { duration: 5000, panelClass: "gsobk" });
          this.router.navigateByUrl("/login");
        } else {
          this.snack.open(res.error, undefined, { duration: 5000, panelClass: "gsobk" });
        }
      })
    } else {
      this.snack.open("Die eingegebenen Daten sind ungültig, bitte prüfen Sie sie erneut.", undefined, { duration: 5000, panelClass: "gsobk" });
    }
  }
}