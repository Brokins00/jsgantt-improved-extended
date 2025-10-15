// Test manuale per il sistema di festività
import { 
  isWorkingDay, 
  isHoliday, 
  countNonWorkingDays, 
  addWorkingDays,
  DEFAULT_WORKING_DAYS 
} from '../src/utils/date_utils';

console.log('=== Test Sistema Festività ===\n');

// Test configurazione giorni lavorativi
console.log('1. Test giorni lavorativi (Lunedì-Venerdì):');
const testDates = [
  new Date(2024, 3, 22), // Lunedì
  new Date(2024, 3, 23), // Martedì  
  new Date(2024, 3, 24), // Mercoledì
  new Date(2024, 3, 25), // Giovedì
  new Date(2024, 3, 26), // Venerdì
  new Date(2024, 3, 27), // Sabato
  new Date(2024, 3, 28)  // Domenica
];

const dayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

testDates.forEach(date => {
  const isWorking = isWorkingDay(date, DEFAULT_WORKING_DAYS);
  const dayName = dayNames[date.getDay()];
  console.log(`${dayName} ${date.getDate()}/4: ${isWorking ? 'Lavorativo' : 'Non lavorativo'}`);
});

// Test festività
console.log('\n2. Test festività:');
const holidays = [
  {
    id: 'natale',
    name: 'Natale',
    startDate: new Date(2024, 11, 25),
    endDate: new Date(2024, 11, 25),
    recurring: true
  },
  {
    id: 'ferie-estive',
    name: 'Ferie Estive',
    startDate: new Date(2024, 7, 10), // 10 agosto
    endDate: new Date(2024, 7, 20),   // 20 agosto
    recurring: false
  }
];

console.log('Natale 2024:', isHoliday(new Date(2024, 11, 25), holidays) ? 'È festività' : 'Non è festività');
console.log('15 Agosto 2024:', isHoliday(new Date(2024, 7, 15), holidays) ? 'È festività (ferie)' : 'Non è festività');
console.log('16 Agosto 2024:', isHoliday(new Date(2024, 7, 16), holidays) ? 'È festività (ferie)' : 'Non è festività');
console.log('22 Agosto 2024:', isHoliday(new Date(2024, 7, 22), holidays) ? 'È festività' : 'Non è festività');

// Test conteggio giorni non lavorativi
console.log('\n3. Test conteggio giorni non lavorativi:');
const startDate = new Date(2024, 3, 22); // Lunedì 22 aprile
const endDate = new Date(2024, 3, 29);   // Lunedì 29 aprile

const nonWorkingDays = countNonWorkingDays(startDate, endDate, DEFAULT_WORKING_DAYS, []);
console.log(`Dal ${startDate.toLocaleDateString('it-IT')} al ${endDate.toLocaleDateString('it-IT')}:`);
console.log(`Giorni non lavorativi (solo weekend): ${nonWorkingDays}`);

// Test con festività
const nonWorkingDaysWithHolidays = countNonWorkingDays(
  new Date(2024, 7, 8),  // 8 agosto
  new Date(2024, 7, 25), // 25 agosto
  DEFAULT_WORKING_DAYS, 
  holidays
);
console.log(`\nDal 8 agosto al 25 agosto 2024:`);
console.log(`Giorni non lavorativi (weekend + ferie): ${nonWorkingDaysWithHolidays}`);

// Test aggiunta giorni lavorativi
console.log('\n4. Test aggiunta giorni lavorativi:');
const baseDate = new Date(2024, 3, 24); // Mercoledì 24 aprile
const resultDate = addWorkingDays(baseDate, 5, DEFAULT_WORKING_DAYS, []);

console.log(`Partendo da: ${baseDate.toLocaleDateString('it-IT')} (${dayNames[baseDate.getDay()]})`);
console.log(`Aggiungendo 5 giorni lavorativi: ${resultDate.toLocaleDateString('it-IT')} (${dayNames[resultDate.getDay()]})`);

// Test con festività
const resultWithHolidays = addWorkingDays(
  new Date(2024, 7, 8), // 8 agosto
  5, 
  DEFAULT_WORKING_DAYS, 
  holidays
);

console.log(`\nPartendo da: 8 agosto 2024 (giovedì)`);
console.log(`Aggiungendo 5 giorni lavorativi (saltando ferie): ${resultWithHolidays.toLocaleDateString('it-IT')} (${dayNames[resultWithHolidays.getDay()]})`);

console.log('\n=== Test Completato ===');