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
      question: "Wie erstelle ich einen Account?",
      answer: "Auf der Startseite der App den Button 'Registrieren' drücken und deine E-Mail-Adresse mit den gewünschten Daten eingeben. Anschließend auf den Button 'Registrieren' klicken."
    },
    {
      question: "Wie setze ich mein Passwort zurück?",
      answer: "Im nicht eingeloggten Zustand auf den Button 'Passwort vergessen?' drücken und danach deine E-Mail-Adresse angeben. Anschließend auf den Button 'Absenden' klicken. Dann erhältst du eine E-Mail mit deinem neuen Passwort (ggf. in den Spam-Ordner gucken). Im eingeloggten Zustand kann das Passwort unter 'Mein Profil' erneuert werden."
    },
    {
      question: "Wie lege ich eine neue Defekt-Meldung an?",
      answer: "Im eingeloggten Zustand auf den Menüpunkt 'Defekt melden' klicken und das Formular ausfüllen. Anschließend auf den Button 'Absenden' klicken."
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
