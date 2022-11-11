import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Report, RoomType } from 'src/app/models/report';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.scss']
})
export class ReportCreateComponent implements OnInit {

  @ViewChild("marker") marker!: ElementRef;

  reportForm: UntypedFormGroup;
  rooms: string[] = [];
  categories: string[] = [
    "Software",
    "Hardware",
    "Peripherie",
    "Sonstiges"
  ];
  roomtype = RoomType;
  roomTypes = [
    {
      type: RoomType.omnibus,
      text: "Omnibus"
    },
    {
      type: RoomType.pc_circle,
      text: "PC-Raum Kreis"
    },
    {
      type: RoomType.pc_sixtable,
      text: "PC-Raum 6er Tischgruppen"
    },
    {
      type: RoomType.u_big,
      text: "U-Form Groß"
    },
    {
      type: RoomType.u_small,
      text: "U-Form Klein"
    },
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.reportForm = fb.group({
      room: ["", Validators.required],
      roomType: [RoomType.omnibus, Validators.required],
      category: ["", Validators.required],
      description: ["", Validators.required],
      position: [{ x: 0, y: 0 }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.api.getRooms().subscribe(res => this.rooms = (res ?? []));
  }

  mark(event: any) {
    var x = event.offsetX;
    var y = event.offsetY;
    console.log(x, y);

    this.reportForm.get("position")?.patchValue({ x, y });

    const _el = this.marker.nativeElement.style;
    _el.left = `${x}px`;
    _el.top = `${y}px`;
    _el.visibility = "visible";
  }

  sendReport() {
    if (this.reportForm.valid) {
      const _report = new Report(this.reportForm.value);
      this.api.postReport(_report).subscribe(res => {
        if (!res?.error) {
          this.snack.open("Der Defekt wurde erfolgreich gemeldet.", undefined, { duration: 5000, panelClass: "gsobk" });
          this.reportForm.reset();
          this.reportForm.get("roomType")?.patchValue(RoomType.omnibus);
          this.marker.nativeElement.style.visibility = "hidden";
        }
      })
    }
  }
}
