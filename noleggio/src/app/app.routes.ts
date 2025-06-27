import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Cottura } from './components/category/cottura/cottura';
import { Preparazione } from './components/category/preparazione/preparazione';
import { Notfound } from './components/notfound/notfound';
import { Lavaggio } from './components/category/lavaggio/lavaggio';
import { Refrigerazione } from './components/category/refrigerazione/refrigerazione';
import { Bareaccessori } from './components/category/bareaccessori/bareaccessori';
import { Occasione } from './components/occasione/occasione';
import { Contatti } from './components/contatti/contatti';
import { Lavelli } from './components/category/lavelli/lavelli';

// Definizione delle rotte principali dell'applicazione
export const routes: Routes = [
    {path: '', component: Home}, // Home page
    {path: 'cottura', component: Cottura}, // Categoria cottura
    {path: 'preparazione', component: Preparazione}, // Categoria preparazione
    {path: 'lavaggio', component: Lavaggio}, // Categoria lavaggio
    {path: 'refrigerazione', component: Refrigerazione}, // Categoria refrigerazione
    {path: 'lavelli', component: Lavelli}, // Categoria lavelli
    {path: 'bar', component: Bareaccessori}, // Categoria bar e accessori
    {path: 'occasione/:sku', component: Occasione}, // Dettaglio occasione tramite SKU
    {path: 'contatti', component: Contatti}, // Pagina contatti
    {path: 'contatti/:oggetto', component: Contatti}, // Pagina contatti con oggetto precompilato
    {path: '**', component: Notfound} // Rotta di fallback per pagina non trovata
];
