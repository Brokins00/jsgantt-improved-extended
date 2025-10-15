"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Test manuale per le funzioni di anni bisestili
const date_utils_1 = require("../src/utils/date_utils");
console.log('=== Test Funzioni Anno Bisestile ===\n');
console.log('Test isLeapYear:');
console.log('2020 (bisestile):', date_utils_1.isLeapYear(2020)); // dovrebbe essere true
console.log('2021 (non bisestile):', date_utils_1.isLeapYear(2021)); // dovrebbe essere false
console.log('2024 (bisestile):', date_utils_1.isLeapYear(2024)); // dovrebbe essere true
console.log('1900 (non bisestile):', date_utils_1.isLeapYear(1900)); // dovrebbe essere false
console.log('2000 (bisestile):', date_utils_1.isLeapYear(2000)); // dovrebbe essere true
console.log('\nTest getDaysInMonth:');
console.log('Febbraio 2020 (bisestile):', date_utils_1.getDaysInMonth(1, 2020)); // dovrebbe essere 29
console.log('Febbraio 2021 (non bisestile):', date_utils_1.getDaysInMonth(1, 2021)); // dovrebbe essere 28
console.log('Febbraio 2024 (bisestile):', date_utils_1.getDaysInMonth(1, 2024)); // dovrebbe essere 29
console.log('Gennaio 2023:', date_utils_1.getDaysInMonth(0, 2023)); // dovrebbe essere 31
console.log('Aprile 2023:', date_utils_1.getDaysInMonth(3, 2023)); // dovrebbe essere 30
console.log('\nTest getMonthDaysArray:');
console.log('Array per 2020 (bisestile):');
console.log(date_utils_1.getMonthDaysArray(2020)); // [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
console.log('Array per 2021 (non bisestile):');
console.log(date_utils_1.getMonthDaysArray(2021)); // [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
console.log('\n=== Confronto Vecchio vs Nuovo ===');
const vecchioArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const nuovoArray2020 = date_utils_1.getMonthDaysArray(2020);
const nuovoArray2021 = date_utils_1.getMonthDaysArray(2021);
console.log('Vecchio array fisso:', vecchioArray);
console.log('Nuovo array 2020 (bisestile):', nuovoArray2020);
console.log('Nuovo array 2021 (non bisestile):', nuovoArray2021);
console.log('\nDifferenza per febbraio:');
console.log('Vecchio (sempre 28):', vecchioArray[1]);
console.log('Nuovo 2020 (bisestile):', nuovoArray2020[1]);
console.log('Nuovo 2021 (non bisestile):', nuovoArray2021[1]);
console.log('\n=== Test Completato ===');
