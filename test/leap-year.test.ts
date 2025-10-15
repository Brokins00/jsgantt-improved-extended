import { isLeapYear, getDaysInMonth, getMonthDaysArray } from '../src/utils/date_utils';
import { expect } from 'chai';

describe('Leap Year Functions', () => {
  describe('isLeapYear', () => {
    it('should correctly identify leap years', () => {
      // Anni bisestili
      expect(isLeapYear(2000)).to.be.true; // Divisibile per 400
      expect(isLeapYear(2004)).to.be.true; // Divisibile per 4 ma non per 100
      expect(isLeapYear(2008)).to.be.true;
      expect(isLeapYear(2012)).to.be.true;
      expect(isLeapYear(2016)).to.be.true;
      expect(isLeapYear(2020)).to.be.true;
      expect(isLeapYear(2024)).to.be.true;
    });

    it('should correctly identify non-leap years', () => {
      // Anni non bisestili
      expect(isLeapYear(1900)).to.be.false; // Divisibile per 100 ma non per 400
      expect(isLeapYear(2001)).to.be.false;
      expect(isLeapYear(2002)).to.be.false;
      expect(isLeapYear(2003)).to.be.false;
      expect(isLeapYear(2100)).to.be.false; // Divisibile per 100 ma non per 400
      expect(isLeapYear(2021)).to.be.false;
      expect(isLeapYear(2022)).to.be.false;
      expect(isLeapYear(2023)).to.be.false;
    });
  });

  describe('getDaysInMonth', () => {
    it('should return correct days for all months in non-leap years', () => {
      const year = 2023; // Anno non bisestile
      expect(getDaysInMonth(0, year)).to.equal(31); // Gennaio
      expect(getDaysInMonth(1, year)).to.equal(28); // Febbraio
      expect(getDaysInMonth(2, year)).to.equal(31); // Marzo
      expect(getDaysInMonth(3, year)).to.equal(30); // Aprile
      expect(getDaysInMonth(4, year)).to.equal(31); // Maggio
      expect(getDaysInMonth(5, year)).to.equal(30); // Giugno
      expect(getDaysInMonth(6, year)).to.equal(31); // Luglio
      expect(getDaysInMonth(7, year)).to.equal(31); // Agosto
      expect(getDaysInMonth(8, year)).to.equal(30); // Settembre
      expect(getDaysInMonth(9, year)).to.equal(31); // Ottobre
      expect(getDaysInMonth(10, year)).to.equal(30); // Novembre
      expect(getDaysInMonth(11, year)).to.equal(31); // Dicembre
    });

    it('should return 29 days for February in leap years', () => {
      expect(getDaysInMonth(1, 2024)).to.equal(29); // Febbraio 2024 (bisestile)
      expect(getDaysInMonth(1, 2020)).to.equal(29); // Febbraio 2020 (bisestile)
      expect(getDaysInMonth(1, 2000)).to.equal(29); // Febbraio 2000 (bisestile)
    });

    it('should return 28 days for February in non-leap years', () => {
      expect(getDaysInMonth(1, 2023)).to.equal(28); // Febbraio 2023 (non bisestile)
      expect(getDaysInMonth(1, 2021)).to.equal(28); // Febbraio 2021 (non bisestile)
      expect(getDaysInMonth(1, 1900)).to.equal(28); // Febbraio 1900 (non bisestile)
    });
  });

  describe('getMonthDaysArray', () => {
    it('should return correct array for non-leap years', () => {
      const expected = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      expect(getMonthDaysArray(2023)).to.deep.equal(expected);
      expect(getMonthDaysArray(2021)).to.deep.equal(expected);
      expect(getMonthDaysArray(1900)).to.deep.equal(expected);
    });

    it('should return correct array for leap years', () => {
      const expected = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      expect(getMonthDaysArray(2024)).to.deep.equal(expected);
      expect(getMonthDaysArray(2020)).to.deep.equal(expected);
      expect(getMonthDaysArray(2000)).to.deep.equal(expected);
    });
  });
});