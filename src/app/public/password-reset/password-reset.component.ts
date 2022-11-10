import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  passwordResetForm: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.passwordResetForm = fb.group({
      email: ["", [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  sendMail()
  {
    if(this.passwordResetForm.invalid) return;
    this.api.resetPassword(this.passwordResetForm.get("email")?.value).subscribe(res => {
      this.router.navigateByUrl("/").finally(() => {
        this.snack.open("Ein Link zum Zurücksetzen des Passworts wurde an deine E-Mail-Adresse gesendet.", undefined, { duration: 5000, panelClass: "gsobk" });
      })
    })
  }
}
