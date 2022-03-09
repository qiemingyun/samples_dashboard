import { standardizeSample } from '../utils/parseData';
import { Sample } from '../types/Sample';

const inputSample: Sample = {
  Date: '2021-08-02T08:04:25Z',
  FirstName: 'Robert',
  LastName: 'Singh',
  Postcode: 7017,
  Sample: 'WPI - Choc Honeycomb Flavour',
  State: 'Tasmania',
};

const outputSample: Sample = {
  Date: '2021-08-02T08:04:25Z',
  FirstName: 'Robert',
  LastName: 'Singh',
  Postcode: 7017,
  Sample: 'WPI - Choc Honeycomb Flavour',
  State: 'Tasmania',
  StateName: 'TAS',
  ProductName: 'WPI',
  Flavor: 'Choc Honeycomb Flavour',
  LocalDate: '2021-08-02 18:04:25',
  LocalDay: 'Mon',
};

test('standardize sample data', () => {
  expect(standardizeSample(inputSample)).toStrictEqual(outputSample);
});
