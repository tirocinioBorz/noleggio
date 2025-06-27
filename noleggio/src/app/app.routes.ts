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

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'cottura', component: Cottura},
    {path: 'preparazione', component: Preparazione},
    {path: 'lavaggio', component: Lavaggio},
    {path: 'refrigerazione', component: Refrigerazione},
    {path: 'lavelli', component: Lavelli},
    {path: 'bar', component: Bareaccessori},
    {path: 'occasione/:sku', component: Occasione},
    {path: 'contatti', component: Contatti},
    {path: 'contatti/:oggetto', component: Contatti},
    {path: '**', component: Notfound}
];
