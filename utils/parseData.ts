import { DAY, STATE } from '../types/Enums';
import { Sample } from '../types/Sample';

const standarizeSampleData = (data: Sample[]): Sample[] => {
  const days = [DAY.Sun, DAY.Mon, DAY.Tue, DAY.Wed, DAY.Thu, DAY.Fri, DAY.Sat];
  data?.forEach((sample) => {
    // split samples to product names and flavors
    const samples = sample.Sample.split(' - ');
    sample.ProductName = samples[0];
    sample.Flavor = samples[1];
    // convert date
    const stdDate = new Date(sample.Date);
    let tz = 'Australia/ACT';
    // standarize state names based on postcode
    // also set time zone
    if (
      (sample.Postcode >= 1000 && sample.Postcode <= 1999) ||
      (sample.Postcode >= 2000 && sample.Postcode <= 2599) ||
      (sample.Postcode >= 2619 && sample.Postcode <= 2899) ||
      (sample.Postcode >= 2921 && sample.Postcode <= 2999)
    ) {
      tz = 'Australia/NSW';
      sample.StateName = STATE.NSW;
    } else if (
      (sample.Postcode >= 200 && sample.Postcode <= 299) ||
      (sample.Postcode >= 2600 && sample.Postcode <= 2618) ||
      (sample.Postcode >= 2900 && sample.Postcode <= 2920)
    ) {
      tz = 'Australia/ACT';
      sample.StateName = STATE.ACT;
    } else if (
      (sample.Postcode >= 3000 && sample.Postcode <= 3999) ||
      (sample.Postcode >= 8000 && sample.Postcode <= 8999)
    ) {
      tz = 'Australia/Victoria';
      sample.StateName = STATE.VIC;
    } else if (
      (sample.Postcode >= 4000 && sample.Postcode <= 4999) ||
      (sample.Postcode >= 9000 && sample.Postcode <= 9999)
    ) {
      tz = 'Australia/Queensland';
      sample.StateName = STATE.QLD;
    } else if (
      (sample.Postcode >= 5000 && sample.Postcode <= 5799) ||
      (sample.Postcode >= 5800 && sample.Postcode <= 5999)
    ) {
      tz = 'Australia/South';
      sample.StateName = STATE.SA;
    } else if (
      (sample.Postcode >= 6000 && sample.Postcode <= 6797) ||
      (sample.Postcode >= 6800 && sample.Postcode <= 6999)
    ) {
      tz = 'Australia/West';
      sample.StateName = STATE.WA;
    } else if (
      (sample.Postcode >= 7000 && sample.Postcode <= 7799) ||
      (sample.Postcode >= 7800 && sample.Postcode <= 7999)
    ) {
      tz = 'Australia/Tasmania';
      sample.StateName = STATE.TAS;
    } else if (
      (sample.Postcode >= 800 && sample.Postcode <= 899) ||
      (sample.Postcode >= 900 && sample.Postcode <= 999)
    ) {
      tz = 'Australia/North';
      sample.StateName = STATE.NT;
    } else {
      sample.StateName = 'InValidPostCode';
    }

    // standarize date
    const moment = require('moment-timezone');
    const localDate = moment.utc(stdDate).tz(tz).format('YYYY-MM-DD HH:mm:ss');
    sample.LocalDate = localDate;
    sample.LocalDay = days[new Date(localDate).getDay()];
  });
  return data;
};

export default standarizeSampleData;
