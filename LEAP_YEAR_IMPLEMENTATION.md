# Implementazione Calcolo Automatico Anni Bisestili

## Sommario
È stata implementata una funzionalità per il calcolo automatico degli anni bisestili nel progetto JSGantt-improved. Ora febbraio avrà automaticamente 29 giorni negli anni bisestili invece di essere fisso a 28 giorni.

## Modifiche Implementate

### 1. Nuove Funzioni in `src/utils/date_utils.ts`

#### `isLeapYear(year)`
- **Scopo**: Verifica se un anno è bisestile
- **Parametri**: `year` - Anno da verificare (number)
- **Ritorna**: `boolean` - true se l'anno è bisestile, false altrimenti
- **Logica**: Un anno è bisestile se:
  - È divisibile per 4 E non è divisibile per 100
  - OPPURE è divisibile per 400

#### `getDaysInMonth(month, year)`
- **Scopo**: Ottiene il numero di giorni in un determinato mese considerando l'anno
- **Parametri**: 
  - `month` - Mese (0-11, dove 0=gennaio, 1=febbraio, ecc.)
  - `year` - Anno
- **Ritorna**: `number` - Numero di giorni nel mese
- **Caratteristiche**: Restituisce 29 per febbraio negli anni bisestili, 28 altrimenti

#### `getMonthDaysArray(year)`
- **Scopo**: Genera un array con i giorni di tutti i mesi per un anno specifico
- **Parametri**: `year` - Anno
- **Ritorna**: `number[]` - Array con 12 elementi (giorni per ogni mese)
- **Caratteristiche**: Febbraio sarà 29 negli anni bisestili, 28 altrimenti

### 2. Modifiche in `src/draw.ts`

- **Rimosso**: Array fisso `vMonthDaysArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]`
- **Aggiunto**: Metodo `getMonthDaysArray(year)` che utilizza la funzione dinamica
- **Aggiunto**: Import della funzione `getMonthDaysArray` da `date_utils`

### 3. Modifiche in `src/utils/general_utils.ts`

- **Aggiunto**: Import della funzione `getDaysInMonth` da `date_utils`
- **Modificato**: Funzione `getOffset` per utilizzare `getDaysInMonth(curTaskEnd.getMonth(), curTaskEnd.getFullYear())` invece dell'array fisso
- **Miglioramento**: Ora i calcoli delle posizioni dei task considerano correttamente gli anni bisestili

## Esempi di Utilizzo

### Test degli Anni Bisestili
```javascript
// 2020 è bisestile
isLeapYear(2020); // true
getDaysInMonth(1, 2020); // 29 (febbraio)

// 2021 non è bisestile  
isLeapYear(2021); // false
getDaysInMonth(1, 2021); // 28 (febbraio)

// Array completo per un anno
getMonthDaysArray(2020); // [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
getMonthDaysArray(2021); // [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
```

### Nel Gantt Chart
```javascript
const gantt = new JSGantt.GanttChart('container', 'month');

// Il gantt ora calcolerà automaticamente i giorni corretti
// per febbraio in base all'anno delle task
gantt.AddTaskItem(new JSGantt.TaskItem({
    pStart: '2020-02-28', // Anno bisestile
    pEnd: '2020-03-01',   // Calcolo corretto con 29 giorni a febbraio
    // ... altri parametri
}));
```

## File di Test

### `test/leap-year.test.ts`
Test unitari completi per tutte le funzioni implementate con casi di test per:
- Anni bisestili e non bisestili
- Tutti i mesi dell'anno
- Casi limite (1900, 2000, ecc.)

### `test/manual-leap-year-test.ts`
Test manuale eseguibile che mostra il confronto tra il comportamento vecchio e nuovo.

### `docs/test-leap-year.html`
Demo HTML che mostra l'integrazione nel Gantt chart con task che attraversano febbraio in anni bisestili e non.

## Benefici

1. **Accuratezza**: I calcoli delle date sono ora precisi per tutti gli anni
2. **Automaticità**: Non serve più intervento manuale per gestire gli anni bisestili
3. **Retrocompatibilità**: Le modifiche non rompono il codice esistente
4. **Performance**: Le funzioni di calcolo sono efficienti e chiamate solo quando necessario

## Test e Verifica

Tutti i test sono stati eseguiti e confermano che:
- Le funzioni di calcolo anni bisestili funzionano correttamente
- Il progetto compila senza errori
- L'integrazione nel Gantt chart funziona come previsto
- I calcoli delle posizioni dei task sono accurati

## Anni Bisestili di Riferimento

- **2020**: Bisestile (29 febbraio)
- **2021**: Non bisestile (28 febbraio)  
- **2024**: Bisestile (29 febbraio)
- **1900**: Non bisestile (28 febbraio) - Divisibile per 100 ma non per 400
- **2000**: Bisestile (29 febbraio) - Divisibile per 400