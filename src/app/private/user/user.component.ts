import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Role, User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  userForm: UntypedFormGroup;
  roomControl = new FormControl<string>('');
  rooms: string[] = [];
  filteredRooms!: Observable<string[]>;

  user: User = new User();
  role = Role;
  roles = [
    Role.admin,
    Role.betreuer,
    Role.lehrer,
    Role.werkstatt,
    Role.user
  ]
  
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {
    this.userForm = fb.group({
      passwordOld: "",
      passwordNew: "",
      role: [Role.user, Validators.required],
      rooms: [""]
    });
  }
  
  ngOnInit(): void {

    this.api.getRooms().subscribe(res => this.rooms = (res ?? []));

    this.filteredRooms = this.roomControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.route.paramMap.subscribe(params => {

        if(params.has("id"))
        {
          this.api.getUser(Number(params.get("id"))).subscribe(res => {
            if(res) {
              this.user = new User(res);
              this.userForm.patchValue(res);
            }
          })
        } else {
          this.router.navigateByUrl("/private/dashboard");
        }
    })
  }

  addRoom()
  {
    const _room = this.roomControl.value ?? "";
    if(this.roomControl.value != "" && !this.user.rooms.includes(_room))
    {
      this.user.rooms.push(_room);
      this.snack.open(`Der Raum ${_room} wurde ${this.user.firstName} ${this.user.lastName} zugeteilt.`, undefined, { duration: 5000, panelClass: "gsobk" });
      this.roomControl.reset();
    }
  }

  editUser()
  {
    this.user.role = this.userForm.get("role")?.value;
    const _oldPassword = this.userForm.get("passwordOld");
    const _newPassword = this.userForm.get("passwordNew");

    const _data = (_oldPassword?.dirty && _newPassword?.dirty) ? { ...this.user, passwordOld: _oldPassword?.value, passwordNew: _newPassword?.value } : this.user;

    this.api.putUser(_data).subscribe({
      next: (res) => {
        if(!res?.error) {
          _oldPassword?.reset();
          _newPassword?.reset();
          this.snack.open("Die Daten wurden erfolgreich gespeichert.", undefined, { duration: 7000, panelClass: "gsobk" });
        } else {
          this.snack.open(res.error, undefined, { duration: 7000, panelClass: "gsobk" });
        }
      },
      error: (data) => {
        this.snack.open(data.error.error, undefined, { duration: 7000, panelClass: "gsobk" });
      }
    })
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.rooms.filter(room => room.toLowerCase().includes(filterValue));
  }
}
