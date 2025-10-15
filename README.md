# @brokins00/jsgantt-improved

[![Build Status](https://travis-ci.com/jsGanttImproved/jsgantt-improved.svg?branch=master)](https://travis-ci.com/jsGanttImproved/jsgantt-improved)

An enhanced version of jsgantt-improved with additional features for better project management.

## 🆕 New Features

### 🗓️ Leap Year Support
- Automatic calculation of leap years
- February correctly shows 29 days in leap years  
- Accurate date calculations for all years

### 🏖️ Holiday & Working Days Management
- Configure working days (e.g., Monday-Friday only)
- Add custom holidays and non-working periods
- Support for recurring holidays (yearly repetition)
- Italian holidays presets included
- Automatic task duration adjustment based on working days

## Original Description

A fully featured gantt chart component built entirely in Javascript, CSS and AJAX. It is lightweight and there is no need of external libraries or additional images. 


![Demo Image](/docs/demo.gif)


Start using with including the files `jsgantt.js` and `jsgantt.css` that are inside `dist/` folder.

## Installation

Install via npm:
```bash
npm install @brokins00/jsgantt-improved
```

Or install the original version:
```bash
npm install jsgantt-improved
```

Import in your JS: 
```javascript
import {JSGantt} from '@brokins00/jsgantt-improved';
```

## 🔥 New Features Usage

### Holiday System Example
```javascript
const gantt = new JSGantt.GanttChart('container', 'day');

// Enable holiday system
gantt.setUseHolidaySystem(true);

// Set Monday-Friday as working days
gantt.setWorkingDaysToWeekdays();

// Add Italian holidays for 2024
gantt.addItalianHolidays(2024);

// Add custom holiday
gantt.addHoliday({
  name: 'Company Holiday',
  startDate: new Date(2024, 7, 10), // August 10
  endDate: new Date(2024, 7, 20),   // August 20
  recurring: false
});

// Tasks will automatically adjust for non-working days
gantt.AddTaskItem(new JSGantt.TaskItem({
  pID: 1,
  pName: 'Summer Project',
  pStart: '2024-08-05',
  pEnd: '2024-08-25',
  pClass: 'gtaskblue'
}));

gantt.Draw();
```

### Leap Year Functions
```javascript
import { isLeapYear, getDaysInMonth } from '@brokins00/jsgantt-improved';

console.log(isLeapYear(2024)); // true
console.log(getDaysInMonth(1, 2024)); // 29 (February in leap year)
console.log(getDaysInMonth(1, 2023)); // 28 (February in non-leap year)
```

## Original Documentation

See the [FULL DOCUMENTATION](./Documentation.md) for more details in all features.

For **Angular** use the component [ng-gantt](https://github.com/jsGanttImproved/ng-gantt) 

For **React** use the component [react-jsgantt](https://github.com/jsGanttImproved/react-jsgantt) 

For **Vue** , see this example: https://stackblitz.com/edit/vue-jsgantt-3

For **.NET** , see this example: [.NET Documentation](./docs/DotNet.md)


## Example


You can view a Solo live example at:

* https://jsganttimproved.github.io/jsgantt-improved/docs/demo.html

Or use a live coding example at Codenpen:

* https://codepen.io/mariomol/pen/mQzBPV


## Easy to Use

```html
<link href="jsgantt.css" rel="stylesheet" type="text/css"/>
<script src="jsgantt.js" type="text/javascript"></script>

<div style="position:relative" class="gantt" id="GanttChartDIV"></div>

<script>

var g = new JSGantt.GanttChart(document.getElementById('GanttChartDIV'), 'day');

g.setOptions({
  vCaptionType: 'Complete',  // Set to Show Caption : None,Caption,Resource,Duration,Complete,     
  vQuarterColWidth: 36,
  vDateTaskDisplayFormat: 'day dd month yyyy', // Shown in tool tip box
  vDayMajorDateDisplayFormat: 'mon yyyy - Week ww',// Set format to dates in the "Major" header of the "Day" view
  vWeekMinorDateDisplayFormat: 'dd mon', // Set format to display dates in the "Minor" header of the "Week" view
  vLang: 'en',
  vShowTaskInfoLink: 1, // Show link in tool tip (0/1)
  vShowEndWeekDate: 0,  // Show/Hide the date for the last day of the week in header for daily
  vAdditionalHeaders: { // Add data columns to your table
      category: {
        title: 'Category'
      },
      sector: {
        title: 'Sector'
      }
    },
  vUseSingleCell: 10000, // Set the threshold cell per table row (Helps performance for large data.
  vFormatArr: ['Day', 'Week', 'Month', 'Quarter'], // Even with setUseSingleCell using Hour format on such a large chart can cause issues in some browsers,
  
});

// Load from a Json url
JSGantt.parseJSON('./fixes/data.json', g);

// Or Adding  Manually
g.AddTaskItemObject({
  pID: 1,
  pName: "Define Chart <strong>API</strong>",
  pStart: "2017-02-25",
  pEnd: "2017-03-17",
  pPlanStart: "2017-04-01",
  pPlanEnd: "2017-04-15 12:00",
  pClass: "ggroupblack",
  pLink: "",
  pMile: 0,
  pRes: "Brian",
  pComp: 0,
  pGroup: 0,
  pParent: 0,
  pOpen: 1,
  pDepend: "",
  pCaption: "",
  pCost: 1000,
  pNotes: "Some Notes text",
  category: "My Category",
  sector: "Finance"
});

g.Draw();

</script>
```

## Features

  * Tasks & Collapsible Task Groups
  * Dependencies and Highlight when hover a task
  * Edit data in gantt table with list of responsible
  * Task Completion
  * Table with Additional Columns
  * Task Styling or as HTML tags
  * Milestones
  * Resources
  * Costs
  * Plan Start and End Dates
  * Gantt with Planned vs Executed
  * Dynamic Loading of Tasks
  * Dynamic change of format: Hour, Day, Week, Month, Quarter
  * Load Gantt from JSON and XML
    * From external files (including experimental support for MS Project XML files)
    * From JavaScript Strings
  
  ### Internationalization 

  Support for languages below:
  
    * Arabic (ar)
    * Chinese (cn)
    * Czech (cs)
    * Dutch (Standard)
    * English (en)
    * French (fr)
    * Finnish (fi)
    * German (de)
    * Hebrew (he)
    * Hungarian (hu)
    * Korean (ko)
    * Indonesian (id)
    * Italian (it)
    * Japanese (ja)
    * Portuguese (pt)
    * Polish (pl)
    * Russian (ru)
    * Spanish (es)
    * Swedish (sv)
    * Turkish (tr)
    * Ukraininan (ua)

## Documentation

See the [Documentation](./Documentation.md) wiki page or the included ``docs/index.html`` file for instructions on use.

Project based on https://code.google.com/p/jsgantt/.


## Want to Collaborate?

Its easy to get it set:

* Clone this repo
* Install lib dependencies: `npm i` 
* Install global dependencies: `npm i -g browserify nodemon onchange tsc`
* Compile final js to be used on demo: `npm run dist`
* Run the demo with a live example:  `npm start`. 
* You can check the demo gantt that we use for testing features at: `http://127.0.0.1:8080/docs/demo.html`
* Use `npm run watch` or do your change in `src` and restart this command refresh the changes.

For testing:
* Install global dependencies: `npm i -g webdriver-manager`  
* Install selenium webdriver: `npm run webdriver`, it will install something like node_modules/webdriver-manager/selenium/chromedriver_88.0.4324.96.zip

node node_modules/protractor/bin/webdriver-manager update
apt install chromium

apt install chromium-bsu

* Use `npm run test` with e2e tests.
* Or use `npm run watch:test` to keep watching the tests

For new release:
* Increment the version number on package.json
* Run `npm run publishnpm`

## 🙏 Credits & Extended Features

This package extends the original jsgantt-improved with:

1. **Leap Year Support**: Automatic February day calculation
2. **Holiday System**: Comprehensive working days and holiday management  
3. **Better Date Calculations**: More accurate task duration calculations
4. **Italian Localization**: Pre-configured Italian holidays

### Original Credits
Based on the excellent work by:
- Mario Mol <mariohmol@gmail.com>
- Eduardo Rodrigues
- Ricardo Cardoso

### Extended by
- **Brokins00** - Added leap year and holiday management features

### Compatibility
Fully backward compatible with existing jsgantt-improved implementations. New features are opt-in.

Or help the original authors donating...

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=S7B43P63C5QEN)


