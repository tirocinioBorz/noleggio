import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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

  contactForm!: FormGroup; // FormGroup per la gestione del form
  oggetto: WritableSignal<string> = signal(''); // Signal reattivo per l'oggetto del messaggio

  // Iniezione di FormBuilder per creare il form e ActivatedRoute per leggere i parametri della route
  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Recupera il parametro 'oggetto' dalla route e lo imposta nel signal
    this.oggetto.set(this.route.snapshot.paramMap.get('oggetto') || '');
    console.log('oggetto:', this.oggetto());

    if (this.oggetto() != '') {
      // Se l'oggetto è presente, crea un form con i campi per il noleggio
      this.contactForm = this.fb.group({
        name: ['', Validators.required], // Campo nome obbligatorio
        email: ['', [Validators.required, Validators.email]], // Campo email obbligatorio e valido
        object: [this.oggetto()], // Oggetto precompilato
        start: ['', Validators.required], // Data inizio obbligatoria
        end: ['', Validators.required], // Data fine obbligatoria
        message: ['', Validators.required] // Messaggio obbligatorio
      });
    } else {
      // Altrimenti, form base senza date di noleggio
      this.contactForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        object: ['', Validators.required],
        message: ['', Validators.required]
      });
    }

    // Inizializza EmailJS con l'ID utente
    init('vM3D-3gmnPjvt_abZ');
  }

  onSubmit(): void {
    // Gestione invio del form
    if (!this.contactForm.valid) {
      // Se il form non è valido, esce
      return;
    }

    if (this.oggetto() != '') {
      // Se l'oggetto è presente, controlla le date di noleggio
      const startDate = new Date(this.contactForm.value.start);
      const endDate = new Date(this.contactForm.value.end);
      const today = new Date();

      if (startDate > today && startDate <= endDate) {
        // Se le date sono corrette, invia l'email tramite EmailJS
        send("service_9llj09k", "template_t24bxss", {
          object: 'Richiesta preventivo per: ' + this.oggetto(),
          name: this.contactForm.value.name,
          email: this.contactForm.value.email,
          start: 'Inizio noleggio: ' + this.contactForm.value.start,
          end: 'Fine noleggio: ' + this.contactForm.value.end,
          message: this.contactForm.value.message,
        })
          .then((res: EmailJSResponseStatus) => {
            alert('Email inviata con successo!'); // Notifica di successo
            this.contactForm.reset(); // Reset del form
          })
          .catch((err: any) => {
            console.error('FAILED...', err); // Log errore
            alert('Errore durante l’invio dell’email'); // Notifica di errore
          });
      } else {
        // Se le date non sono corrette, mostra un alert
        alert('La data di inizio deve essere successiva alla data di oggi e la data di fine maggiore o uguale a quella di inizio');
      }
    } else {
      // Se l'oggetto non è presente, invia l'email senza le date di noleggio
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
