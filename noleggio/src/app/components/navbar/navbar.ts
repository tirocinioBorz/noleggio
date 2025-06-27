import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as Papa from 'papaparse';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { OccasioneService } from '../../services/occasione.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  searchInput = new FormControl(''); // Campo di input per la ricerca
  service: OccasioneService = inject(OccasioneService); // Iniezione del servizio prodotti

  all: WritableSignal<any[]> = signal<any[]>([]); // Signal per tutti i prodotti
  filteredProdotti: any[] = []; // Array per i prodotti filtrati dalla ricerca

  ngOnInit() {
    // All'avvio, recupera i prodotti dal servizio
    this.service.getProdotti()
      .subscribe(prodotti => {
        console.log('Prodotti Navbar:', prodotti); // Log dei prodotti ricevuti
        this.all.set(prodotti); // Salva i prodotti nel signal

        // Gestione della ricerca: ascolta i cambiamenti dell'input con debounce
        this.searchInput.valueChanges.pipe(
          debounceTime(300), // Attende 300ms dopo l'ultimo input
          distinctUntilChanged() // Solo se il valore cambia
        ).subscribe(value => {
          if (value) {
            // Filtra i prodotti in base al testo inserito
            this.filteredProdotti = this.all().filter(p => 
              p.post_title.toLowerCase().includes(value.toLowerCase())
            );
          } else {
            // Se la ricerca è vuota, svuota i risultati
            this.filteredProdotti = [];
          }
          console.log('Prodotti filtrati:', this.filteredProdotti); // Log dei risultati filtrati
        });
      }, error => {
        // Gestione errore nel recupero prodotti
        console.error('Errore nel recupero dei prodotti:', error);
        this.all.set([]);
        this.filteredProdotti = [];
      });
  }

}