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
  rooms: string[] = [
    "C001", "C002", "C003",
    "B001", "B002", "B003",
    "A001", "A002", "A003"
  ];
  filteredRooms!: Observable<string[]>;
  roomsAssigned: string[] = [];

  user: User = new User();
  role = Role;
  roles = [
    Role.admin,
    Role.betreuer,
    Role.lehrer,
    Role.werkstatt
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
      role: ["", Validators.required],
      rooms: [""]
    });
  }
  
  ngOnInit(): void {

    this.filteredRooms = this.roomControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.route.paramMap.subscribe(params => {

        if(params.has("id"))
        {
          this.api.getUser(Number(params.get("id"))).subscribe(res => {
            if(res) {
              this.user = res;
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
    if(this.roomControl.value != "" && !this.roomsAssigned.includes(_room))
    {
      this.roomsAssigned.push(_room);
      this.snack.open(`Der Raum ${_room} wurde ${this.user.firstName} ${this.user.lastName} zugeteilt.`, undefined, { duration: 5000 });
      this.roomControl.reset();
    }
  }

  editUser()
  {
    this.api.putUser(this.user).subscribe(res => {
      if(res.error) this.snack.open(res.error, undefined, { duration: 7000 });
    })
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.rooms.filter(room => room.toLowerCase().includes(filterValue));
  }
}
