import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { init, send, EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  standalone: true,
  selector: 'app-contatti',
  imports: [ReactiveFormsModule],
  templateUrl: './contatti.html',
  styleUrls: ['./contatti.css']
})
export class Contatti implements OnInit {

  contactForm!: FormGroup;
  oggetto: WritableSignal<string> = signal('');

  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.oggetto.set(this.route.snapshot.paramMap.get('oggetto') || '');
    console.log('oggetto:', this.oggetto());

    if (this.oggetto() != '') {
      this.contactForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        object: [this.oggetto()],
        start: ['', Validators.required],
        end: ['', Validators.required],
        message: ['', Validators.required]
      });
    } else {
      this.contactForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        object: ['', Validators.required],
        message: ['', Validators.required]
      });
    }

    init('vM3D-3gmnPjvt_abZ');
  }

  onSubmit(): void {
    if (!this.contactForm.valid) {
      return;
    }

    if (this.oggetto() != '') {

      const startDate = new Date(this.contactForm.value.start);
      const endDate = new Date(this.contactForm.value.end);
      const today = new Date();

      if (startDate > today && startDate <= endDate) {
        send("service_9llj09k", "template_t24bxss", {
          object: 'Richiesta preventivo per: ' + this.oggetto(),
          name: this.contactForm.value.name,
          email: this.contactForm.value.email,
          start: 'Inizio noleggio: ' + this.contactForm.value.start,
          end: 'Fine noleggio: ' + this.contactForm.value.end,
          message: this.contactForm.value.message,
        })
          .then((res: EmailJSResponseStatus) => {
            alert('Email inviata con successo!');
            this.contactForm.reset();
          })
          .catch((err: any) => {
            console.error('FAILED...', err);
            alert('Errore durante l’invio dell’email');
          });
      } else {
        alert('La data di inizio deve essere successiva alla data di oggi e la data di fine maggiore o uguale a quella di inizio');
      }
    } else {
      send("service_9llj09k", "template_t24bxss", {
        object: this.contactForm.value.object,
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        message: this.contactForm.value.message,
      })
        .then((res: EmailJSResponseStatus) => {
          alert('Email inviata con successo!');
          this.contactForm.reset();
        })
        .catch((err: any) => {
          console.error('FAILED...', err);
          alert('Errore durante l’invio dell’email');
        });
    }

  }
}
