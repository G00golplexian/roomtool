import { Component, OnInit, ViewChild } from '@angular/core';
import { Faq } from 'src/app/models/faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqs: Faq[] = [
    {
      question: "Wie wird das Wetter heute?",
      answer: "Nicht besonders gut."
    },
    {
      question: "Wie wird das Wetter morgen?",
      answer: "Besser."
    },
    {
      question: "Wie wird das Wetter nächste Woche?",
      answer: "Keine Ahnung."
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
