import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { OccasioneService } from '../../services/occasione.service';
import { Notfound } from '../notfound/notfound';

@Component({
  selector: 'app-occasione',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './occasione.html',
  styleUrls: ['./occasione.css']
})
export class Occasione implements OnInit, OnDestroy {
  prodotto: any; // Prodotto corrente visualizzato
  loading = true; // Stato di caricamento
  notFound = false; // Stato per prodotto non trovato

  private routeSub!: Subscription; // Subscription ai parametri della route
  private prodSub!: Subscription; // Subscription al prodotto

  constructor(
    private route: ActivatedRoute, // Iniezione della route per leggere i parametri
    private occasioneService: OccasioneService // Iniezione del servizio prodotti
  ) { }

  ngOnInit(): void {
    // Sottoscrizione ai cambiamenti dei parametri della route
    this.routeSub = this.route.paramMap.subscribe(params => {
      const sku = params.get('sku'); // Recupera SKU dalla route
      console.log('SKU cambiato:', sku);

      this.loading = true;
      this.notFound = false;
      this.prodotto = null;

      if (sku) {
        // Se lo SKU è presente, recupera il prodotto dal servizio
        this.prodSub = this.occasioneService.getProdottoBySku(sku).subscribe({
          next: prodotto => {
            if (prodotto) {
              this.prodotto = prodotto; // Prodotto trovato
              console.log('Prodotto caricato:', prodotto);
            } else {
              // Prodotto non trovato
              console.error('Prodotto non trovato per SKU:', sku);
              this.notFound = true;
            }
            this.loading = false;
          },
          error: error => {
            // Errore nel recupero del prodotto
            console.error('Errore recupero prodotto:', error);
            this.loading = false;
            this.notFound = true;
          }
        });
      } else {
        // SKU mancante nella route
        console.error('SKU mancante nella route');
        this.loading = false;
        this.notFound = true;
      }
    });
  }

  ngOnDestroy(): void {
    // Disiscrive le subscription per evitare memory leak
    this.routeSub?.unsubscribe();
    this.prodSub?.unsubscribe();
  }
}
