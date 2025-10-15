import { 
  isWorkingDay, 
  isHoliday, 
  isNonWorkingDay, 
  countNonWorkingDays, 
  addWorkingDays,
  DEFAULT_WORKING_DAYS,
  Holiday,
  WorkingDaysConfig 
} from '../src/utils/date_utils';
import { expect } from 'chai';

describe('Holiday System Functions', () => {
  const customWorkingDays: WorkingDaysConfig = {
    monday: true,
    tuesday: true, 
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false
  };

  const testHolidays: Holiday[] = [
    {
      id: 'natale',
      name: 'Natale',
      startDate: new Date(2024, 11, 25), // 25 dicembre
      endDate: new Date(2024, 11, 25),
      recurring: true
    },
    {
      id: 'capodanno',
      name: 'Capodanno',
      startDate: new Date(2024, 0, 1), // 1 gennaio
      endDate: new Date(2024, 0, 1),
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

  describe('isWorkingDay', () => {
    it('should correctly identify working days with Monday-Friday config', () => {
      expect(isWorkingDay(new Date(2024, 3, 22), customWorkingDays)).to.be.true;  // Lunedì
      expect(isWorkingDay(new Date(2024, 3, 23), customWorkingDays)).to.be.true;  // Martedì
      expect(isWorkingDay(new Date(2024, 3, 24), customWorkingDays)).to.be.true;  // Mercoledì
      expect(isWorkingDay(new Date(2024, 3, 25), customWorkingDays)).to.be.true;  // Giovedì
      expect(isWorkingDay(new Date(2024, 3, 26), customWorkingDays)).to.be.true;  // Venerdì
    });

    it('should correctly identify non-working days with Monday-Friday config', () => {
      expect(isWorkingDay(new Date(2024, 3, 27), customWorkingDays)).to.be.false; // Sabato
      expect(isWorkingDay(new Date(2024, 3, 28), customWorkingDays)).to.be.false; // Domenica
    });

    it('should work with default working days configuration', () => {
      expect(isWorkingDay(new Date(2024, 3, 22), DEFAULT_WORKING_DAYS)).to.be.true;  // Lunedì
      expect(isWorkingDay(new Date(2024, 3, 27), DEFAULT_WORKING_DAYS)).to.be.false; // Sabato
      expect(isWorkingDay(new Date(2024, 3, 28), DEFAULT_WORKING_DAYS)).to.be.false; // Domenica
    });
  });

  describe('isHoliday', () => {
    it('should correctly identify single-day holidays', () => {
      expect(isHoliday(new Date(2024, 11, 25), testHolidays)).to.be.true;  // Natale
      expect(isHoliday(new Date(2024, 0, 1), testHolidays)).to.be.true;    // Capodanno
      expect(isHoliday(new Date(2024, 3, 25), testHolidays)).to.be.false;  // Giorno normale
    });

    it('should correctly identify multi-day holidays', () => {
      expect(isHoliday(new Date(2024, 7, 10), testHolidays)).to.be.true;  // Primo giorno ferie
      expect(isHoliday(new Date(2024, 7, 15), testHolidays)).to.be.true;  // Giorno centrale ferie
      expect(isHoliday(new Date(2024, 7, 20), testHolidays)).to.be.true;  // Ultimo giorno ferie
      expect(isHoliday(new Date(2024, 7, 9), testHolidays)).to.be.false;  // Giorno prima
      expect(isHoliday(new Date(2024, 7, 21), testHolidays)).to.be.false; // Giorno dopo
    });

    it('should handle recurring holidays correctly', () => {
      const recurringHolidays: Holiday[] = [
        {
          id: 'natale',
          name: 'Natale',
          startDate: new Date(2023, 11, 25),
          endDate: new Date(2023, 11, 25),
          recurring: true
        }
      ];

      // Deve riconoscere il Natale anche negli altri anni
      expect(isHoliday(new Date(2024, 11, 25), recurringHolidays)).to.be.true;
      expect(isHoliday(new Date(2025, 11, 25), recurringHolidays)).to.be.true;
    });
  });

  describe('isNonWorkingDay', () => {
    it('should identify weekends as non-working with Monday-Friday config', () => {
      expect(isNonWorkingDay(new Date(2024, 3, 27), customWorkingDays, [])).to.be.true;  // Sabato
      expect(isNonWorkingDay(new Date(2024, 3, 28), customWorkingDays, [])).to.be.true;  // Domenica
    });

    it('should identify holidays as non-working', () => {
      expect(isNonWorkingDay(new Date(2024, 11, 25), customWorkingDays, testHolidays)).to.be.true;  // Natale
      expect(isNonWorkingDay(new Date(2024, 7, 15), customWorkingDays, testHolidays)).to.be.true;   // Ferie estive
    });

    it('should identify working days correctly', () => {
      expect(isNonWorkingDay(new Date(2024, 3, 23), customWorkingDays, testHolidays)).to.be.false; // Martedì normale
    });
  });

  describe('countNonWorkingDays', () => {
    it('should count weekends correctly', () => {
      const startDate = new Date(2024, 3, 22); // Lunedì
      const endDate = new Date(2024, 3, 29);   // Lunedì successivo
      
      // In una settimana ci sono 2 giorni di weekend
      const count = countNonWorkingDays(startDate, endDate, customWorkingDays, []);
      expect(count).to.equal(2);
    });

    it('should count holidays correctly', () => {
      const startDate = new Date(2024, 7, 8);  // 8 agosto
      const endDate = new Date(2024, 7, 25);   // 25 agosto
      
      // Le ferie estive vanno dal 10 al 20 agosto (11 giorni)
      // Plus weekends nel periodo
      const count = countNonWorkingDays(startDate, endDate, customWorkingDays, testHolidays);
      expect(count).to.be.greaterThan(11); // Almeno le ferie + alcuni weekend
    });
  });

  describe('addWorkingDays', () => {
    it('should add working days correctly skipping weekends', () => {
      const startDate = new Date(2024, 3, 24); // Mercoledì
      const result = addWorkingDays(startDate, 5, customWorkingDays, []);
      
      // 5 giorni lavorativi da mercoledì dovrebbero portare al martedì successivo
      // (salta sabato e domenica)
      expect(result.getDay()).to.equal(2); // Martedì
      expect(result.getDate()).to.equal(30); // 30 aprile
    });

    it('should add working days correctly skipping holidays', () => {
      const startDate = new Date(2024, 7, 8);  // 8 agosto (giovedì)
      const result = addWorkingDays(startDate, 5, customWorkingDays, testHolidays);
      
      // Dovrebbe saltare le ferie estive (10-20 agosto) e i weekend
      expect(result.getDate()).to.be.greaterThan(20); // Dopo le ferie
    });
  });

  describe('DEFAULT_WORKING_DAYS', () => {
    it('should have Monday to Friday as working days', () => {
      expect(DEFAULT_WORKING_DAYS.monday).to.be.true;
      expect(DEFAULT_WORKING_DAYS.tuesday).to.be.true;
      expect(DEFAULT_WORKING_DAYS.wednesday).to.be.true;
      expect(DEFAULT_WORKING_DAYS.thursday).to.be.true;
      expect(DEFAULT_WORKING_DAYS.friday).to.be.true;
      expect(DEFAULT_WORKING_DAYS.saturday).to.be.false;
      expect(DEFAULT_WORKING_DAYS.sunday).to.be.false;
    });
  });
});