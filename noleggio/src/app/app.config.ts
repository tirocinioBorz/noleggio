import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes'; // Import delle rotte dell'applicazione
import { HttpClientModule } from '@angular/common/http'; // Modulo HTTP per le chiamate API

// Configurazione principale dell'applicazione Angular
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // Gestione globale degli errori
    importProvidersFrom(HttpClientModule), // Provider per le richieste HTTP
    provideZoneChangeDetection({ eventCoalescing: true }), // Ottimizzazione del rilevamento dei cambiamenti
    provideRouter(routes) // Provider per il routing
  ]
};
