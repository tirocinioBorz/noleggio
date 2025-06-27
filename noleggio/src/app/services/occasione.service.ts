import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import * as Papa from 'papaparse';

// Import dei moduli Angular, HttpClient, RxJS e papaparse

@Injectable({
  providedIn: 'root' // Il servizio è disponibile in tutto il progetto
})
export class OccasioneService {

  private csvPath = '/assets/csvoccasioni.csv'; // Percorso del file CSV delle occasioni

  constructor(private http: HttpClient) {}

  // Recupera tutti i prodotti dal CSV e li restituisce come Observable di array
  getProdotti(): Observable<any[]> {
    return this.http.get(this.csvPath, { responseType: 'text' }).pipe(
      map(csvData => {
        const results = Papa.parse(csvData, {
          header: true, // Usa la prima riga come intestazione
          delimiter: ';', // Delimitatore di campo
          skipEmptyLines: true // Salta le righe vuote
        });

        console.log('Parsed CSV', results.data); // Log dei dati parsati

        if (results.errors.length > 0) {
          // Log degli eventuali errori nel parsing
          console.error('Errori nel CSV:', results.errors);
        }

        return results.data; // Restituisce i dati come array di oggetti
      })
    );
  }

  // Recupera un singolo prodotto tramite SKU
  getProdottoBySku(sku: string): Observable<any> {
    return this.getProdotti().pipe(
      map(prodotti => prodotti.find(p => p.sku?.trim() === sku))
    );
  }
}
