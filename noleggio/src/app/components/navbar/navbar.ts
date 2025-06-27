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

  searchInput = new FormControl('');
  service: OccasioneService = inject(OccasioneService);

  all: WritableSignal<any[]> = signal<any[]>([]);
  filteredProdotti: any[] = [];

  ngOnInit() {
    
    this.service.getProdotti()
      .subscribe(prodotti => {
        console.log('Prodotti Navbar:', prodotti);
        this.all.set(prodotti);

        this.searchInput.valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged()
        ).subscribe(value => {
          if (value) {
            this.filteredProdotti = this.all().filter(p => 
              p.post_title.toLowerCase().includes(value.toLowerCase())
            );
          } else {
            this.filteredProdotti = [];
          }
          console.log('Prodotti filtrati:', this.filteredProdotti);
        });
      }, error => {
        console.error('Errore nel recupero dei prodotti:', error);
        this.all.set([]);
        this.filteredProdotti = [];
      });
  }

}