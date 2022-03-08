import SamplePie from '../components/SamplePie';
import SampleBar from '../components/SampleBar';
import Map, { MapDataItem, MapProps } from '../components/AustraliaMap';
import styles from '../styles/Home.module.css';
import { Row, Col, Select } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useCallback, useEffect, useRef, useState } from 'react';
import SelectOption, { OptionProps } from '../components/SelectOption';
import { PieDataItem } from '../components/SamplePie';
import { Sample } from '../types/Sample';
import { STATE, DAY, PRODUCT } from '../types/Enums';
import { useFetch } from '../utils/useFetch';
import standarizeSampleData from '../utils/parseData';

export default function Home() {
  const days = [DAY.Sun, DAY.Mon, DAY.Tue, DAY.Wed, DAY.Thu, DAY.Fri, DAY.Sat];

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

  const [productOptions, setProductOptions] = useState([]);
  const [barXData, setBarXData] = useState([]);
  const [barYData, setBarYData] = useState([]);
  const [pieData, setPieData] = useState<PieDataItem[]>([]);
  const [mapProps, setMapProps] = useState<MapProps>({});
  const [samples, setSamples] = useState<Sample[]>();

  const {
    loading,
    error,
    data = [],
  } = useFetch<Sample[]>(
    'https://secure.bulknutrients.com.au/content/bEzWsxcHPewMt/sampledata.json'
  );

  useEffect(() => {
    setSamples(standarizeSampleData(data));
  }, [data]);

  useEffect(() => {
    console.log('useEffectSamples,', samples);
    analyzeProductData(samples);
  }, [samples]);

  var _ = require('lodash');

  const onProductChange = (productName: string) => {
    if (productName === PRODUCT.All) {
      analyzeProductData(samples);
    } else {
      const productSamples = _.filter(samples, function (sample: Sample) {
        return sample.ProductName === productName;
      });
      analyzeFlavorData(productSamples);
    }
  };

  return (
    <div className={styles.container}>
      <Header
        style={{
          color: 'white',
          backgroundColor: 'orange',
          fontSize: 26,
        }}
      >
        Bulk Nutrients Sample DashBoard
      </Header>
      <Row
        style={{
          height: '3rem',
          backgroundColor: 'gray',
          alignContent: 'center',
        }}
      >
        <Col span={10}>
          <div className={styles.text}>Show Me by</div>
        </Col>
        <Col span={2}>
          <div className={styles.text}>Product: </div>
        </Col>
        <Col span={12}>
          <SelectOption
            options={productOptions}
            defaultValue={PRODUCT.All}
            onChange={onProductChange}
            style={{ width: '12rem', marginLeft: '1rem' }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: '3rem' }}>
        <Col span={14}>
          <Map
            title="The Number of Samples Sent by State"
            data={mapProps.data}
            minNum={mapProps.minNum}
            maxNum={mapProps.maxNum}
          />
        </Col>
        <Col span={10} style={{ padding: '2rem' }}>
          <SamplePie title="Category Distribution" data={pieData} />
          <SampleBar
            xData={barXData}
            yData={barYData}
            title="The Number of Samples Sent by Day"
          />
        </Col>
      </Row>
    </div>
  );

  function analyzeProductData(data: Sample[]) {
    // filter by states
    const stateSamples = _.filter(data, function (sample: Sample) {
      return sample.StateName !== 'InValidPostCode';
    });

    // count by state
    const numByState = _.countBy(stateSamples, 'StateName');
    // console.log('numByState', numByState);
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

    setMapProps(mapPropsData);

    // unique product names
    const uniqProductLists = _.uniqBy(data, 'ProductName');
    const uniqProductNames = _.map(uniqProductLists, 'ProductName');

    let productOpts = [{ value: PRODUCT.All, name: PRODUCT.All }];
    uniqProductNames.forEach((productName) => {
      productOpts.push({ value: productName, name: productName });
    });
    setProductOptions(productOpts);

    // count by product
    const numByProduct = _.countBy(data, 'ProductName');
    const pieDataMap = _.map(numByProduct, function (value, name) {
      return { value: value, name: name };
    });
    setPieData(_.orderBy(pieDataMap, 'value', 'desc'));

    // count by day
    const numByDay = _.countBy(data, 'LocalDay');
    // console.log('numByDay', numByDay);
    let numByDayOrdered = [];
    days.forEach((day) => {
      numByDayOrdered.push(_.get(numByDay, day));
    });
    // console.log('numByDayOrdered', numByDayOrdered);
    setBarXData(days);
    setBarYData(numByDayOrdered);
  }

  function analyzeFlavorData(data: Sample[]) {
    console.log('analyzeFlavorData', data);
    // filter by states
    const stateSamples = _.filter(data, function (sample: Sample) {
      return sample.StateName !== 'InValidPostCode';
    });

    // count by state
    const numByState = _.countBy(stateSamples, 'StateName');
    // console.log('numByState', numByState);
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

    setMapProps(mapPropsData);

    // count by product
    const numByFlavor = _.countBy(data, 'Flavor');
    const pieDataMap = _.map(numByFlavor, function (value, name) {
      return { value: value, name: name };
    });
    setPieData(_.orderBy(pieDataMap, 'value', 'desc'));

    // count by day
    const numByDay = _.countBy(data, 'LocalDay');
    // console.log('numByDay', numByDay);
    let numByDayOrdered = [];
    days.forEach((day) => {
      numByDayOrdered.push(_.get(numByDay, day));
    });
    // console.log('numByDayOrdered', numByDayOrdered);
    setBarXData(days);
    setBarYData(numByDayOrdered);
  }
}
