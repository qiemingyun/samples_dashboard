import { DAY, STATE } from '../types/Enums';
import { Sample } from '../types/Sample';

const moment = require('moment-timezone');

const LOCAL_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 *
 * @param data
 * @returns
 */
export function standardizeSampleData(data: Sample[]): Sample[] {
  data?.forEach((sample) => {
    standardizeSample(sample);
  });
  return data;
}

/**
 * standardize sample
 * @param sample
 */
export function standardizeSample(sample: Sample): Sample {
  // split product names and flavors
  const { productName, flavor } = splitProductName(sample.Sample);
  sample.ProductName = productName;
  sample.Flavor = flavor;

  // standardize state names
  const { stateName } = standardizeState(sample.Postcode);
  sample.StateName = stateName;

  // convert to local date
  const { localDate, day } = convert2LocalDate(
    sample.Date,
    sample.StateName,
    LOCAL_DATE_FORMAT
  );
  sample.LocalDate = localDate;
  sample.LocalDay = day;

  return sample;
}

/**
 * split product names and flavors
 * @param sampleName
 * @returns
 */
function splitProductName(sampleName: string): {
  productName: string;
  flavor: string;
} {
  const samples = sampleName.split('-');
  const productName = samples[0].trim();
  const flavor = samples[1]?.trim();

  return { productName, flavor };
}

/**
 * standardize state names based on postcode
 * @param sample
 * @returns
 */
function standardizeState(postcode: number): { stateName: string } {
  let stateName: string = '';
  if (
    (postcode >= 1000 && postcode <= 1999) ||
    (postcode >= 2000 && postcode <= 2599) ||
    (postcode >= 2619 && postcode <= 2899) ||
    (postcode >= 2921 && postcode <= 2999)
  ) {
    stateName = STATE.NSW;
  } else if (
    (postcode >= 200 && postcode <= 299) ||
    (postcode >= 2600 && postcode <= 2618) ||
    (postcode >= 2900 && postcode <= 2920)
  ) {
    stateName = STATE.ACT;
  } else if (
    (postcode >= 3000 && postcode <= 3999) ||
    (postcode >= 8000 && postcode <= 8999)
  ) {
    stateName = STATE.VIC;
  } else if (
    (postcode >= 4000 && postcode <= 4999) ||
    (postcode >= 9000 && postcode <= 9999)
  ) {
    stateName = STATE.QLD;
  } else if (
    (postcode >= 5000 && postcode <= 5799) ||
    (postcode >= 5800 && postcode <= 5999)
  ) {
    stateName = STATE.SA;
  } else if (
    (postcode >= 6000 && postcode <= 6797) ||
    (postcode >= 6800 && postcode <= 6999)
  ) {
    stateName = STATE.WA;
  } else if (
    (postcode >= 7000 && postcode <= 7799) ||
    (postcode >= 7800 && postcode <= 7999)
  ) {
    stateName = STATE.TAS;
  } else if (
    (postcode >= 800 && postcode <= 899) ||
    (postcode >= 900 && postcode <= 999)
  ) {
    stateName = STATE.NT;
  } else {
    stateName = 'InValidPostCode';
  }
  return { stateName };
}

/**
 * convert utc time to local date
 * @param utcDate utc date
 * @param stateName
 * @param format
 * @returns
 */
function convert2LocalDate(
  utcDate: string,
  stateName: string,
  format: string
): { localDate: string; day: string } {
  const days = [DAY.Sun, DAY.Mon, DAY.Tue, DAY.Wed, DAY.Thu, DAY.Fri, DAY.Sat];

  const stdDate = new Date(utcDate);
  const timezone = getTimezone(stateName);
  const localDate = moment.utc(stdDate).tz(timezone).format(format);

  const day = days[new Date(localDate).getDay()];

  return { localDate, day };
}

/**
 * get timezone based on state name
 * @param stateName
 * @returns
 */
function getTimezone(stateName: string): string {
  let timezone = 'Australia/ACT';
  // standarize state names based on postcode
  // also set time zone
  switch (stateName) {
    case STATE.NSW:
      timezone = 'Australia/NSW';
      break;
    case STATE.ACT:
      timezone = 'Australia/ACT';
      break;
    case STATE.VIC:
      timezone = 'Australia/Victoria';
      break;
    case STATE.QLD:
      timezone = 'Australia/Queensland';
      break;
    case STATE.SA:
      timezone = 'Australia/South';
      break;
    case STATE.WA:
      timezone = 'Australia/West';
      break;
    case STATE.TAS:
      timezone = 'Australia/Tasmania';
      break;
    case STATE.NT:
      timezone = 'Australia/North';
      break;
  }
  return timezone;
}
