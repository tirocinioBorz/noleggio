import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class OccasioneService {

  private csvPath = '/assets/csvoccasioni.csv';

  constructor(private http: HttpClient) {}

  getProdotti(): Observable<any[]> {
    return this.http.get(this.csvPath, { responseType: 'text' }).pipe(
      map(csvData => {
        const results = Papa.parse(csvData, {
          header: true,
          delimiter: ';',
          skipEmptyLines: true
        });

        console.log('Parsed CSV', results.data);

        if (results.errors.length > 0) {
          console.error('Errori nel CSV:', results.errors);
        }

        return results.data;
      })
    );
  }

  getProdottoBySku(sku: string): Observable<any> {
    return this.getProdotti().pipe(
      map(prodotti => prodotti.find(p => p.sku?.trim() === sku))
    );
  }
}
