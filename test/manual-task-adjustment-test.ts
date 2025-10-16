// Test per l'aggiustamento automatico delle date dei task
import { 
  calculateAdjustedEndDate, 
  countWorkingDaysInPeriod,
  DEFAULT_WORKING_DAYS,
  Holiday
} from '../src/utils/date_utils';

console.log('=== Test Aggiustamento Automatico Date Task ===\n');

// Configurazione di test: Lunedì-Venerdì lavorativi
const workingDays = DEFAULT_WORKING_DAYS;

// Festività di test
const holidays: Holiday[] = [
  {
    id: 'test-holiday',
    name: 'Festività Test',
    startDate: new Date(2024, 3, 16), // 16 aprile (martedì)
    endDate: new Date(2024, 3, 16),
    recurring: false
  }
];

console.log('Configurazione test:');
console.log('- Giorni lavorativi: Lunedì-Venerdì');
console.log('- Festività: 16 aprile 2024');

console.log('\n=== Test Scenario del problema ===');

// Scenario: Task dal 14 al 16 aprile, con il 16 che è festività
const taskStart = new Date(2024, 3, 14); // 14 aprile (domenica)
const taskEnd = new Date(2024, 3, 16);   // 16 aprile (martedì - festività)

console.log(`Task originale: ${taskStart.toLocaleDateString('it-IT')} - ${taskEnd.toLocaleDateString('it-IT')}`);

// Conta giorni lavorativi nel periodo originale
const workingDaysOriginal = countWorkingDaysInPeriod(taskStart, taskEnd, workingDays, holidays);
console.log(`Giorni lavorativi nel periodo originale: ${workingDaysOriginal}`);

// Calcola la nuova data di fine
const adjustedEndDate = calculateAdjustedEndDate(taskStart, taskEnd, workingDays, holidays);
console.log(`Data di fine aggiustata: ${adjustedEndDate.toLocaleDateString('it-IT')}`);

console.log('\n=== Verifica dettagliata ===');

// Analizziamo giorno per giorno
let currentDate = new Date(taskStart.getTime());
while (currentDate <= adjustedEndDate) {
  const dayName = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'][currentDate.getDay()];
  const isWorking = !workingDays ? true : 
    (currentDate.getDay() >= 1 && currentDate.getDay() <= 5); // Lun-Ven
  const isHoliday = holidays.some(h => 
    currentDate.getTime() >= h.startDate.getTime() && 
    currentDate.getTime() <= h.endDate.getTime()
  );
  const status = !isWorking ? 'Weekend' : 
                 isHoliday ? 'Festività' : 'Lavorativo';
  
  console.log(`${currentDate.toLocaleDateString('it-IT')} (${dayName}): ${status}`);
  currentDate.setDate(currentDate.getDate() + 1);
}

console.log('\n=== Altri test ===');

// Test 2: Task dal lunedì al mercoledì con martedì festivo
console.log('\nTest 2: Lun-Mer con Mar festivo');
const task2Start = new Date(2024, 3, 15); // 15 aprile (lunedì)
const task2End = new Date(2024, 3, 17);   // 17 aprile (mercoledì)
const adjusted2 = calculateAdjustedEndDate(task2Start, task2End, workingDays, holidays);
console.log(`Originale: ${task2Start.toLocaleDateString('it-IT')} - ${task2End.toLocaleDateString('it-IT')}`);
console.log(`Aggiustato: ${task2Start.toLocaleDateString('it-IT')} - ${adjusted2.toLocaleDateString('it-IT')}`);

// Test 3: Task di 5 giorni lavorativi
console.log('\nTest 3: 5 giorni lavorativi dal lunedì');
const task3Start = new Date(2024, 3, 15); // 15 aprile (lunedì)
// Aggiungiamo 5 giorni lavorativi manualmente
import { addWorkingDays } from '../src/utils/date_utils';
const task3End = addWorkingDays(task3Start, 4, workingDays, holidays); // 4 perché includiamo il giorno di inizio
console.log(`5 giorni lavorativi dal ${task3Start.toLocaleDateString('it-IT')}: ${task3End.toLocaleDateString('it-IT')}`);

console.log('\n=== Test Completato ===');