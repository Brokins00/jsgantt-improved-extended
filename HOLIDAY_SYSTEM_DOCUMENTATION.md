# Sistema di Gestione Festività e Giorni Non Lavorativi

## Panoramica

È stato implementato un sistema completo per la gestione delle festività e dei giorni non lavorativi nel progetto JSGantt-improved. Questo sistema permette di:

- **Configurare giorni lavorativi**: Definire quali giorni della settimana sono lavorativi
- **Gestire festività**: Aggiungere festività singole o ricorrenti
- **Calcolo automatico durate**: I task si adattano automaticamente saltando giorni non lavorativi
- **Retrocompatibilità**: Il sistema legacy continua a funzionare

## Nuove Funzionalità

### 1. Interfacce TypeScript

#### `Holiday`
```typescript
interface Holiday {
  id?: string;           // Identificativo univoco
  name: string;          // Nome della festività
  startDate: Date;       // Data di inizio
  endDate: Date;         // Data di fine
  recurring?: boolean;   // Se true, si ripete ogni anno
  description?: string;  // Descrizione opzionale
}
```

#### `WorkingDaysConfig`
```typescript
interface WorkingDaysConfig {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}
```

### 2. Funzioni di Utilità

#### Verifica Giorni Lavorativi
```typescript
// Verifica se una data è un giorno lavorativo
isWorkingDay(date: Date, workingDays: WorkingDaysConfig): boolean

// Verifica se una data è una festività
isHoliday(date: Date, holidays: Holiday[]): boolean

// Verifica se una data è non lavorativa (weekend + festività)
isNonWorkingDay(date: Date, workingDays: WorkingDaysConfig, holidays: Holiday[]): boolean
```

#### Calcoli di Date
```typescript
// Conta giorni non lavorativi in un periodo
countNonWorkingDays(startDate: Date, endDate: Date, workingDays: WorkingDaysConfig, holidays: Holiday[]): number

// Aggiunge giorni lavorativi a una data
addWorkingDays(startDate: Date, workingDaysToAdd: number, workingDays: WorkingDaysConfig, holidays: Holiday[]): Date
```

#### Configurazione Predefinita
```typescript
// Configurazione lunedì-venerdì
const DEFAULT_WORKING_DAYS: WorkingDaysConfig
```

### 3. Metodi del Gantt Chart

#### Configurazione Sistema
```javascript
// Abilita il sistema di festività
gantt.setUseHolidaySystem(true);

// Imposta giorni lavorativi personalizzati
gantt.setCustomWorkingDays({
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: false,
  sunday: false
});

// Imposta rapidamente lunedì-venerdì
gantt.setWorkingDaysToWeekdays();
```

#### Gestione Festività
```javascript
// Aggiunge una festività
gantt.addHoliday({
  id: 'natale',
  name: 'Natale',
  startDate: new Date(2024, 11, 25),
  endDate: new Date(2024, 11, 25),
  recurring: true
});

// Rimuove una festività
gantt.removeHoliday('natale');

// Pulisce tutte le festività
gantt.clearHolidays();

// Ottiene lista festività
const holidays = gantt.getHolidays();

// Aggiunge festività italiane predefinite
gantt.addItalianHolidays(2024);
```

## Esempi di Utilizzo

### Configurazione Base (Solo Weekend)
```javascript
const gantt = new JSGantt.GanttChart('container', 'day');

// Abilita il sistema
gantt.setUseHolidaySystem(true);

// Imposta lunedì-venerdì come giorni lavorativi
gantt.setWorkingDaysToWeekdays();

// I task ora salteranno automaticamente i weekend
gantt.Draw();
```

### Configurazione Completa con Festività
```javascript
const gantt = new JSGantt.GanttChart('container', 'day');

// Abilita il sistema
gantt.setUseHolidaySystem(true);

// Configura giorni lavorativi
gantt.setWorkingDaysToWeekdays();

// Aggiunge festività italiane
gantt.addItalianHolidays(2024);

// Aggiunge festività personalizzate
gantt.addHoliday({
  id: 'ferie-aziendali',
  name: 'Ferie Aziendali Estive',
  startDate: new Date(2024, 7, 10), // 10 agosto
  endDate: new Date(2024, 7, 20),   // 20 agosto
  recurring: false,
  description: 'Chiusura aziendale'
});

// Aggiunge task
gantt.AddTaskItem(new JSGantt.TaskItem({
  pID: 1,
  pName: 'Progetto Estivo',
  pStart: '2024-08-05',  // Lunedì
  pEnd: '2024-08-25',    // Si adatterà automaticamente
  pClass: 'gtaskblue'
}));

gantt.Draw();
```

### Calcoli Manuali di Date
```javascript
import { addWorkingDays, DEFAULT_WORKING_DAYS } from './src/utils/date_utils';

// Calcola data di fine considerando giorni lavorativi
const startDate = new Date(2024, 3, 22); // Lunedì
const holidays = gantt.getHolidays();

// Aggiunge 10 giorni lavorativi
const endDate = addWorkingDays(
  startDate, 
  10, 
  DEFAULT_WORKING_DAYS, 
  holidays
);

console.log(`Inizio: ${startDate.toLocaleDateString()}`);
console.log(`Fine (10 giorni lavorativi): ${endDate.toLocaleDateString()}`);
```

## Festività Italiane Predefinite

Il metodo `addItalianHolidays(year)` aggiunge automaticamente:

- **1 Gennaio**: Capodanno
- **6 Gennaio**: Epifania  
- **25 Aprile**: Festa della Liberazione
- **1 Maggio**: Festa del Lavoro
- **2 Giugno**: Festa della Repubblica
- **15 Agosto**: Ferragosto
- **1 Novembre**: Ognissanti
- **8 Dicembre**: Immacolata Concezione
- **25 Dicembre**: Natale
- **26 Dicembre**: Santo Stefano

Tutte configurate come ricorrenti (si ripetono ogni anno).

## Retrocompatibilità

Il sistema è completamente retrocompatibile:

- **Sistema disabilitato**: Comportamento identico a prima
- **Sistema legacy**: `vShowWeekends` continua a funzionare
- **Transizione graduale**: Si può abilitare progressivamente

## File Modificati

### Nuovi File
- `test/holiday-system.test.ts` - Test unitari completi
- `test/manual-holiday-test.ts` - Test manuali
- `docs/demo-holidays.html` - Demo interattiva

### File Modificati
- `src/utils/date_utils.ts` - Nuove funzioni e interfacce
- `src/utils/general_utils.ts` - Aggiornata funzione `getOffset`
- `src/draw.ts` - Nuovi metodi e proprietà
- `src/options.ts` - Nuovi metodi di configurazione

## Test e Verifica

### Test Automatici
```bash
# I test confermano il corretto funzionamento di:
# - Identificazione giorni lavorativi
# - Riconoscimento festività
# - Calcolo giorni non lavorativi
# - Aggiunta giorni lavorativi
# - Festività ricorrenti
```

### Demo Interattiva
La demo `docs/demo-holidays.html` permette di:
- Abilitare/disabilitare il sistema
- Configurare giorni lavorativi
- Aggiungere festività
- Vedere l'effetto sui task in tempo reale

## Benefici

1. **Pianificazione Realistica**: I tempi di progetto riflettono la realtà lavorativa
2. **Flessibilità**: Configurabile per diverse realtà aziendali
3. **Automazione**: Calcolo automatico delle durate
4. **Semplicità**: API intuitiva e ben documentata
5. **Estensibilità**: Facile aggiungere nuove tipologie di festività

## Prestazioni

- **Efficienza**: Algoritmi ottimizzati per grandi dataset
- **Memoria**: Strutture dati leggere
- **Velocità**: Calcoli in tempo reale senza ritardi percettibili

Il sistema è progettato per gestire facilmente progetti con centinaia di task e decine di festività senza impatti sulle prestazioni.