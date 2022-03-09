import { MapProps } from '../components/AustraliaMap';
import { DAY, STATE } from '../types/Enums';
import { Sample } from '../types/Sample';

/**
 * count by ProductName or Flavor and set up pie props
 * @param data
 * @param pieFilterName 'ProductName' | 'Flavor'
 * @returns
 */
export function getPieProps(data: Sample[], pieFilterName: string) {
  var _ = require('lodash');
  const numByFlavor = _.countBy(data, pieFilterName);
  const pieDataMap = _.map(numByFlavor, function (value, name) {
    return { value: value, name: name };
  });
  return _.orderBy(pieDataMap, 'value', 'desc');
}

/**
 * count by state and set up bar props
 * @param data
 * @returns
 */
export function getBarProps(data: Sample[]): {
  days: string[];
  numByDayOrdered: string[];
} {
  var _ = require('lodash');
  const days = [DAY.Sun, DAY.Mon, DAY.Tue, DAY.Wed, DAY.Thu, DAY.Fri, DAY.Sat];
  // count by day
  const numByDay = _.countBy(data, 'LocalDay');
  let numByDayOrdered = [];
  days.forEach((day) => {
    numByDayOrdered.push(_.get(numByDay, day));
  });
  return { days, numByDayOrdered };
}

/**
 * count by state and set up map props
 * @param data
 * @returns
 */
export function getMapProps(data: Sample[]): MapProps {
  const states = [
    STATE.NSW,
    STATE.VIC,
    STATE.QLD,
    STATE.SA,
    STATE.WA,
    STATE.TAS,
    STATE.NT,
    STATE.ACT,
  ];
  var _ = require('lodash');

  // filter by states
  const stateSamples = _.filter(data, function (sample: Sample) {
    return sample.StateName !== 'InValidPostCode';
  });

  // count by state
  const numByState = _.countBy(stateSamples, 'StateName');
  let stateDataMap = [];
  states.forEach((state) => {
    let num = _.get(numByState, state);
    if (num === undefined) {
      num = 0;
    }
    stateDataMap.push({ name: state, value: num });
  });

  const stateValues = _.map(stateDataMap, 'value');
  let mapPropsData: MapProps = {};
  mapPropsData.data = stateDataMap;
  mapPropsData.maxNum = _.ceil(_.max(stateValues), -2);
  mapPropsData.minNum = _.floor(_.min(stateValues), -2);
  return mapPropsData;
}
