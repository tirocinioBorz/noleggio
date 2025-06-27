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
  prodotto: any;
  loading = true;
  notFound = false;

  private routeSub!: Subscription;
  private prodSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private occasioneService: OccasioneService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const sku = params.get('sku');
      console.log('SKU cambiato:', sku);

      this.loading = true;
      this.notFound = false;
      this.prodotto = null;

      if (sku) {
        this.prodSub = this.occasioneService.getProdottoBySku(sku).subscribe({
          next: prodotto => {
            if (prodotto) {
              this.prodotto = prodotto;
              console.log('Prodotto caricato:', prodotto);
            } else {
              console.error('Prodotto non trovato per SKU:', sku);
              this.notFound = true;
            }
            this.loading = false;
          },
          error: error => {
            console.error('Errore recupero prodotto:', error);
            this.loading = false;
            this.notFound = true;
          }
        });
      } else {
        console.error('SKU mancante nella route');
        this.loading = false;
        this.notFound = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.prodSub?.unsubscribe();
  }
}
