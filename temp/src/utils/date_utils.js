"use strict";
/**
 * DATES
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsoWeek = exports.parseDateFormatStr = exports.formatDateStr = exports.parseDateStr = exports.coerceDate = exports.getMaxDate = exports.getMinDate = exports.DEFAULT_WORKING_DAYS = exports.addWorkingDays = exports.countNonWorkingDays = exports.isNonWorkingDay = exports.isHoliday = exports.isWorkingDay = exports.getMonthDaysArray = exports.getDaysInMonth = exports.isLeapYear = exports.countWorkingDaysInPeriod = exports.calculateAdjustedEndDate = void 0;
/**
 * Calcola la data di fine di un task considerando solo i giorni lavorativi
 * @param startDate Data di inizio del task
 * @param originalEndDate Data di fine originale del task
 * @param workingDays Configurazione giorni lavorativi
 * @param holidays Array di festività
 * @returns Nuova data di fine che considera i giorni non lavorativi
 */
exports.calculateAdjustedEndDate = function (startDate, originalEndDate, workingDays, holidays) {
    // Calcola i giorni totali del periodo originale (inclusi entrambi gli estremi)
    const totalDaysOriginal = Math.ceil((originalEndDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;
    // Calcola quanti di questi dovrebbero essere giorni lavorativi (senza considerare festività)
    let expectedWorkingDays = 0;
    const tempDate = new Date(startDate.getTime());
    for (let i = 0; i < totalDaysOriginal; i++) {
        if (exports.isWorkingDay(tempDate, workingDays)) {
            expectedWorkingDays++;
        }
        tempDate.setDate(tempDate.getDate() + 1);
    }
    // Se non ci sono giorni lavorativi attesi, restituisce la data originale
    if (expectedWorkingDays <= 0) {
        return originalEndDate;
    }
    // Ora aggiungi questi giorni lavorativi alla data di inizio, saltando festività
    return exports.addWorkingDays(startDate, expectedWorkingDays - 1, workingDays, holidays);
};
/**
 * Verifica se un anno è bisestile

/**
 * Conta i giorni lavorativi in un periodo (inclusivo)
 * @param startDate Data di inizio (inclusa)
 * @param endDate Data di fine (inclusa)
 * @param workingDays Configurazione giorni lavorativi
 * @param holidays Array di festività
 * @returns Numero di giorni lavorativi nel periodo
 */
exports.countWorkingDaysInPeriod = function (startDate, endDate, workingDays, holidays) {
    let count = 0;
    const currentDate = new Date(startDate.getTime());
    while (currentDate <= endDate) {
        if (!exports.isNonWorkingDay(currentDate, workingDays, holidays)) {
            count++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
};
/**
 * Verifica se una data è bisestile
 * @param year Anno da verificare
 * @returns true se l'anno è bisestile, false altrimenti
 */
exports.isLeapYear = function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};
/**
 * Ottiene il numero di giorni in un determinato mese e anno
 * @param month Mese (0-11, dove 0 = gennaio, 1 = febbraio, ecc.)
 * @param year Anno
 * @returns Numero di giorni nel mese
 */
exports.getDaysInMonth = function (month, year) {
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Se è febbraio e l'anno è bisestile, restituisce 29 giorni
    if (month === 1 && exports.isLeapYear(year)) {
        return 29;
    }
    return monthDays[month];
};
/**
 * Ottiene un array con i giorni di tutti i mesi per un determinato anno
 * @param year Anno
 * @returns Array con il numero di giorni per ogni mese (0-11)
 */
exports.getMonthDaysArray = function (year) {
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Se l'anno è bisestile, imposta febbraio a 29 giorni
    if (exports.isLeapYear(year)) {
        monthDays[1] = 29;
    }
    return monthDays;
};
/**
 * Verifica se una data cade in un giorno lavorativo secondo la configurazione
 * @param date Data da verificare
 * @param workingDays Configurazione giorni lavorativi
 * @returns true se è un giorno lavorativo, false altrimenti
 */
exports.isWorkingDay = function (date, workingDays) {
    const dayOfWeek = date.getDay(); // 0 = domenica, 1 = lunedì, ..., 6 = sabato
    switch (dayOfWeek) {
        case 0: return workingDays.sunday;
        case 1: return workingDays.monday;
        case 2: return workingDays.tuesday;
        case 3: return workingDays.wednesday;
        case 4: return workingDays.thursday;
        case 5: return workingDays.friday;
        case 6: return workingDays.saturday;
        default: return false;
    }
};
/**
 * Verifica se una data cade durante una festività
 * @param date Data da verificare
 * @param holidays Array di festività
 * @returns true se è una festività, false altrimenti
 */
exports.isHoliday = function (date, holidays) {
    const dateTime = date.getTime();
    return holidays.some(holiday => {
        let startDate = holiday.startDate;
        let endDate = holiday.endDate;
        // Se è ricorrente, adatta le date all'anno corrente
        if (holiday.recurring) {
            const currentYear = date.getFullYear();
            startDate = new Date(currentYear, holiday.startDate.getMonth(), holiday.startDate.getDate());
            endDate = new Date(currentYear, holiday.endDate.getMonth(), holiday.endDate.getDate());
        }
        // Verifica se la data cade nel periodo della festività
        return dateTime >= startDate.getTime() && dateTime <= endDate.getTime();
    });
};
/**
 * Verifica se una data è un giorno non lavorativo (weekend o festività)
 * @param date Data da verificare
 * @param workingDays Configurazione giorni lavorativi
 * @param holidays Array di festività
 * @returns true se è un giorno non lavorativo, false altrimenti
 */
exports.isNonWorkingDay = function (date, workingDays, holidays) {
    return !exports.isWorkingDay(date, workingDays) || exports.isHoliday(date, holidays);
};
/**
 * Calcola il numero di giorni non lavorativi in un periodo
 * @param startDate Data di inizio
 * @param endDate Data di fine
 * @param workingDays Configurazione giorni lavorativi
 * @param holidays Array di festività
 * @returns Numero di giorni non lavorativi
 */
exports.countNonWorkingDays = function (startDate, endDate, workingDays, holidays) {
    let count = 0;
    const currentDate = new Date(startDate.getTime());
    while (currentDate < endDate) {
        if (exports.isNonWorkingDay(currentDate, workingDays, holidays)) {
            count++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
};
/**
 * Aggiunge giorni lavorativi a una data, saltando weekend e festività
 * @param startDate Data di partenza
 * @param workingDaysToAdd Numero di giorni lavorativi da aggiungere
 * @param workingDays Configurazione giorni lavorativi
 * @param holidays Array di festività
 * @returns Nuova data dopo l'aggiunta dei giorni lavorativi
 */
exports.addWorkingDays = function (startDate, workingDaysToAdd, workingDays, holidays) {
    const result = new Date(startDate.getTime());
    let daysAdded = 0;
    while (daysAdded < workingDaysToAdd) {
        result.setDate(result.getDate() + 1);
        if (!exports.isNonWorkingDay(result, workingDays, holidays)) {
            daysAdded++;
        }
    }
    return result;
};
/**
 * Configurazione predefinita per lunedì-venerdì come giorni lavorativi
 */
exports.DEFAULT_WORKING_DAYS = {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false
};
exports.getMinDate = function (pList, pFormat, pMinDate) {
    let vDate = new Date();
    if (pList.length <= 0)
        return pMinDate || vDate;
    vDate.setTime((pMinDate && pMinDate.getTime()) || pList[0].getStart().getTime());
    // Parse all Task Start dates to find min
    for (let i = 0; i < pList.length; i++) {
        if (pList[i].getStart().getTime() < vDate.getTime())
            vDate.setTime(pList[i].getStart().getTime());
        if (pList[i].getPlanStart() && pList[i].getPlanStart().getTime() < vDate.getTime())
            vDate.setTime(pList[i].getPlanStart().getTime());
    }
    // Adjust min date to specific format boundaries (first of week or first of month)
    if (pFormat == 'day') {
        vDate.setDate(vDate.getDate() - 1);
        while (vDate.getDay() % 7 != 1)
            vDate.setDate(vDate.getDate() - 1);
    }
    else if (pFormat == 'week') {
        vDate.setDate(vDate.getDate() - 1);
        while (vDate.getDay() % 7 != 1)
            vDate.setDate(vDate.getDate() - 1);
    }
    else if (pFormat == 'month') {
        vDate.setDate(vDate.getDate() - 15);
        while (vDate.getDate() > 1)
            vDate.setDate(vDate.getDate() - 1);
    }
    else if (pFormat == 'quarter') {
        vDate.setDate(vDate.getDate() - 31);
        if (vDate.getMonth() == 0 || vDate.getMonth() == 1 || vDate.getMonth() == 2)
            vDate.setFullYear(vDate.getFullYear(), 0, 1);
        else if (vDate.getMonth() == 3 || vDate.getMonth() == 4 || vDate.getMonth() == 5)
            vDate.setFullYear(vDate.getFullYear(), 3, 1);
        else if (vDate.getMonth() == 6 || vDate.getMonth() == 7 || vDate.getMonth() == 8)
            vDate.setFullYear(vDate.getFullYear(), 6, 1);
        else if (vDate.getMonth() == 9 || vDate.getMonth() == 10 || vDate.getMonth() == 11)
            vDate.setFullYear(vDate.getFullYear(), 9, 1);
    }
    else if (pFormat == 'hour') {
        vDate.setHours(vDate.getHours() - 1);
        while (vDate.getHours() % 6 != 0)
            vDate.setHours(vDate.getHours() - 1);
    }
    if (pFormat == 'hour')
        vDate.setMinutes(0, 0);
    else
        vDate.setHours(0, 0, 0);
    return (vDate);
};
exports.getMaxDate = function (pList, pFormat, pMaxDate) {
    let vDate = new Date();
    if (pList.length <= 0)
        return pMaxDate || vDate;
    vDate.setTime((pMaxDate && pMaxDate.getTime()) || pList[0].getEnd().getTime());
    // Parse all Task End dates to find max
    for (let i = 0; i < pList.length; i++) {
        if (pList[i].getEnd().getTime() > vDate.getTime())
            vDate.setTime(pList[i].getEnd().getTime());
        if (pList[i].getPlanEnd() && pList[i].getPlanEnd().getTime() > vDate.getTime())
            vDate.setTime(pList[i].getPlanEnd().getTime());
    }
    // Adjust max date to specific format boundaries (end of week or end of month)
    if (pFormat == 'day') {
        vDate.setDate(vDate.getDate() + 1);
        while (vDate.getDay() % 7 != 0)
            vDate.setDate(vDate.getDate() + 1);
    }
    else if (pFormat == 'week') {
        //For weeks, what is the last logical boundary?
        vDate.setDate(vDate.getDate() + 1);
        while (vDate.getDay() % 7 != 0)
            vDate.setDate(vDate.getDate() + 1);
    }
    else if (pFormat == 'month') {
        // Set to last day of current Month
        while (vDate.getDate() > 1)
            vDate.setDate(vDate.getDate() + 1);
        vDate.setDate(vDate.getDate() - 1);
    }
    else if (pFormat == 'quarter') {
        // Set to last day of current Quarter
        if (vDate.getMonth() == 0 || vDate.getMonth() == 1 || vDate.getMonth() == 2)
            vDate.setFullYear(vDate.getFullYear(), 2, 31);
        else if (vDate.getMonth() == 3 || vDate.getMonth() == 4 || vDate.getMonth() == 5)
            vDate.setFullYear(vDate.getFullYear(), 5, 30);
        else if (vDate.getMonth() == 6 || vDate.getMonth() == 7 || vDate.getMonth() == 8)
            vDate.setFullYear(vDate.getFullYear(), 8, 30);
        else if (vDate.getMonth() == 9 || vDate.getMonth() == 10 || vDate.getMonth() == 11)
            vDate.setFullYear(vDate.getFullYear(), 11, 31);
    }
    else if (pFormat == 'hour') {
        if (vDate.getHours() == 0)
            vDate.setDate(vDate.getDate() + 1);
        vDate.setHours(vDate.getHours() + 1);
        while (vDate.getHours() % 6 != 5)
            vDate.setHours(vDate.getHours() + 1);
    }
    return (vDate);
};
exports.coerceDate = function (date) {
    if (date instanceof Date) {
        return date;
    }
    else {
        const temp = new Date(date);
        if (temp instanceof Date && !isNaN(temp.valueOf())) {
            return temp;
        }
    }
};
exports.parseDateStr = function (pDateStr, pFormatStr) {
    let vDate = new Date();
    let vDateParts = pDateStr.split(/[^0-9]/);
    if (pDateStr.length >= 10 && vDateParts.length >= 3) {
        while (vDateParts.length < 5)
            vDateParts.push(0);
        switch (pFormatStr) {
            case 'mm/dd/yyyy':
                vDate = new Date(vDateParts[2], vDateParts[0] - 1, vDateParts[1], vDateParts[3], vDateParts[4]);
                break;
            case 'dd/mm/yyyy':
                vDate = new Date(vDateParts[2], vDateParts[1] - 1, vDateParts[0], vDateParts[3], vDateParts[4]);
                break;
            case 'yyyy-mm-dd':
                vDate = new Date(vDateParts[0], vDateParts[1] - 1, vDateParts[2], vDateParts[3], vDateParts[4]);
                break;
            case 'yyyy-mm-dd HH:MI:SS':
                vDate = new Date(vDateParts[0], vDateParts[1] - 1, vDateParts[2], vDateParts[3], vDateParts[4], vDateParts[5]);
                break;
        }
    }
    return (vDate);
};
exports.formatDateStr = function (pDate, pDateFormatArr, pL) {
    // Fix on issue #303 - getXMLTask is passing null as pDates
    if (!pDate) {
        return;
    }
    let vDateStr = '';
    let vYear2Str = pDate.getFullYear().toString().substring(2, 4);
    let vMonthStr = (pDate.getMonth() + 1) + '';
    let vMonthArr = new Array(pL['january'], pL['february'], pL['march'], pL['april'], pL['maylong'], pL['june'], pL['july'], pL['august'], pL['september'], pL['october'], pL['november'], pL['december']);
    let vDayArr = new Array(pL['sunday'], pL['monday'], pL['tuesday'], pL['wednesday'], pL['thursday'], pL['friday'], pL['saturday']);
    let vMthArr = new Array(pL['jan'], pL['feb'], pL['mar'], pL['apr'], pL['may'], pL['jun'], pL['jul'], pL['aug'], pL['sep'], pL['oct'], pL['nov'], pL['dec']);
    let vDyArr = new Array(pL['sun'], pL['mon'], pL['tue'], pL['wed'], pL['thu'], pL['fri'], pL['sat']);
    for (let i = 0; i < pDateFormatArr.length; i++) {
        switch (pDateFormatArr[i]) {
            case 'dd':
                if (pDate.getDate() < 10)
                    vDateStr += '0'; // now fall through
            case 'd':
                vDateStr += pDate.getDate();
                break;
            case 'day':
                vDateStr += vDyArr[pDate.getDay()];
                break;
            case 'DAY':
                vDateStr += vDayArr[pDate.getDay()];
                break;
            case 'mm':
                if (parseInt(vMonthStr, 10) < 10)
                    vDateStr += '0'; // now fall through
            case 'm':
                vDateStr += vMonthStr;
                break;
            case 'mon':
                vDateStr += vMthArr[pDate.getMonth()];
                break;
            case 'month':
                vDateStr += vMonthArr[pDate.getMonth()];
                break;
            case 'yyyy':
                vDateStr += pDate.getFullYear();
                break;
            case 'yy':
                vDateStr += vYear2Str;
                break;
            case 'qq':
                vDateStr += pL['qtr']; // now fall through
            case 'q':
                vDateStr += Math.floor(pDate.getMonth() / 3) + 1;
                break;
            case 'hh':
                if ((((pDate.getHours() % 12) == 0) ? 12 : pDate.getHours() % 12) < 10)
                    vDateStr += '0'; // now fall through
            case 'h':
                vDateStr += ((pDate.getHours() % 12) == 0) ? 12 : pDate.getHours() % 12;
                break;
            case 'HH':
                if ((pDate.getHours()) < 10)
                    vDateStr += '0'; // now fall through
            case 'H':
                vDateStr += (pDate.getHours());
                break;
            case 'MI':
                if (pDate.getMinutes() < 10)
                    vDateStr += '0'; // now fall through
            case 'mi':
                vDateStr += pDate.getMinutes();
                break;
            case 'SS':
                if (pDate.getSeconds() < 10)
                    vDateStr += '0'; // now fall through
            case 'ss':
                vDateStr += pDate.getSeconds();
                break;
            case 'pm':
                vDateStr += ((pDate.getHours()) < 12) ? 'am' : 'pm';
                break;
            case 'PM':
                vDateStr += ((pDate.getHours()) < 12) ? 'AM' : 'PM';
                break;
            case 'ww':
                if (exports.getIsoWeek(pDate) < 10)
                    vDateStr += '0'; // now fall through
            case 'w':
                vDateStr += exports.getIsoWeek(pDate);
                break;
            case 'week':
                let vWeekNum = exports.getIsoWeek(pDate);
                let vYear = pDate.getFullYear();
                let vDayOfWeek = (pDate.getDay() == 0) ? 7 : pDate.getDay();
                if (vWeekNum >= 52 && parseInt(vMonthStr, 10) === 1)
                    vYear--;
                if (vWeekNum == 1 && parseInt(vMonthStr, 10) === 12)
                    vYear++;
                if (vWeekNum < 10)
                    vWeekNum = parseInt('0' + vWeekNum, 10);
                vDateStr += vYear + '-W' + vWeekNum + '-' + vDayOfWeek;
                break;
            default:
                if (pL[pDateFormatArr[i].toLowerCase()])
                    vDateStr += pL[pDateFormatArr[i].toLowerCase()];
                else
                    vDateStr += pDateFormatArr[i];
                break;
        }
    }
    return vDateStr;
};
exports.parseDateFormatStr = function (pFormatStr) {
    let vComponantStr = '';
    let vCurrChar = '';
    let vSeparators = new RegExp('[\/\\ -.,\'":]');
    let vDateFormatArray = new Array();
    for (let i = 0; i < pFormatStr.length; i++) {
        vCurrChar = pFormatStr.charAt(i);
        if ((vCurrChar.match(vSeparators)) || (i + 1 == pFormatStr.length)) // separator or end of string
         {
            if ((i + 1 == pFormatStr.length) && (!(vCurrChar.match(vSeparators)))) // at end of string add any non-separator chars to the current component
             {
                vComponantStr += vCurrChar;
            }
            vDateFormatArray.push(vComponantStr);
            if (vCurrChar.match(vSeparators))
                vDateFormatArray.push(vCurrChar);
            vComponantStr = '';
        }
        else {
            vComponantStr += vCurrChar;
        }
    }
    return vDateFormatArray;
};
/**
 * We have to compare against the monday of the first week of the year containing 04 jan *not* 01/01
 * 60*60*24*1000=86400000
 * @param pDate
 */
exports.getIsoWeek = function (pDate) {
    let dayMiliseconds = 86400000;
    let keyDay = new Date(pDate.getFullYear(), 0, 4, 0, 0, 0);
    let keyDayOfWeek = (keyDay.getDay() == 0) ? 6 : keyDay.getDay() - 1; // define monday as 0
    let firstMondayYearTime = keyDay.getTime() - (keyDayOfWeek * dayMiliseconds);
    let thisDate = new Date(pDate.getFullYear(), pDate.getMonth(), pDate.getDate(), 0, 0, 0); // This at 00:00:00
    let thisTime = thisDate.getTime();
    let daysFromFirstMonday = Math.round(((thisTime - firstMondayYearTime) / dayMiliseconds));
    let lastWeek = 99;
    let thisWeek = 99;
    let firstMondayYear = new Date(firstMondayYearTime);
    thisWeek = Math.ceil((daysFromFirstMonday + 1) / 7);
    if (thisWeek <= 0)
        thisWeek = exports.getIsoWeek(new Date(pDate.getFullYear() - 1, 11, 31, 0, 0, 0));
    else if (thisWeek == 53 && (new Date(pDate.getFullYear(), 0, 1, 0, 0, 0)).getDay() != 4 && (new Date(pDate.getFullYear(), 11, 31, 0, 0, 0)).getDay() != 4)
        thisWeek = 1;
    return thisWeek;
};
