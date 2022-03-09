import SamplePie from '../components/SamplePie';
import SampleBar from '../components/SampleBar';
import Map, { MapProps } from '../components/AustraliaMap';
import styles from '../styles/Home.module.css';
import { Row, Col } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import SelectOption from '../components/SelectOption';
import { PieDataItem } from '../components/SamplePie';
import { Sample } from '../types/Sample';
import { PRODUCT } from '../types/Enums';
import { useFetch } from '../utils/useFetch';
import { standardizeSampleData } from '../utils/parseData';
import { getBarProps, getMapProps, getPieProps } from '../utils/charts';

export default function Home() {
  const [productOptions, setProductOptions] = useState([]);
  const [barXData, setBarXData] = useState([]);
  const [barYData, setBarYData] = useState([]);
  const [pieData, setPieData] = useState<PieDataItem[]>([]);
  const [mapProps, setMapProps] = useState<MapProps>({});
  const [samples, setSamples] = useState<Sample[]>();

  const { loading, data = [] } = useFetch<Sample[]>(
    'https://secure.bulknutrients.com.au/content/bEzWsxcHPewMt/sampledata.json'
  );

  var _ = require('lodash');

  useEffect(() => {
    setSamples(standardizeSampleData(data));
  }, [data]);

  useEffect(() => {
    handleProductOptions(data);
    analyzeData(samples, 'ProductName');
  }, [samples]);

  /**
   * parse product options
   * @param data
   */
  function handleProductOptions(data: Sample[]) {
    const uniqProductLists = _.uniqBy(data, 'ProductName');
    const uniqProductNames = _.map(uniqProductLists, 'ProductName');

    let productOpts = [{ value: PRODUCT.All, name: PRODUCT.All }];
    uniqProductNames.forEach((productName) => {
      productOpts.push({ value: productName, name: productName });
    });
    setProductOptions(productOpts);
  }

  const onProductChange = (productName: string) => {
    if (productName === PRODUCT.All) {
      analyzeData(samples, 'ProductName');
    } else {
      const productSamples = _.filter(samples, function (sample: Sample) {
        return sample.ProductName === productName;
      });
      analyzeData(productSamples, 'Flavor');
    }
  };

  /**
   * analyze data
   * @param data
   * @param pieFilterName
   */
  function analyzeData(data: Sample[], pieFilterName: string) {
    setMapProps(getMapProps(data));
    setPieData(getPieProps(data, pieFilterName));

    const { days, numByDayOrdered } = getBarProps(data);
    setBarXData(days);
    setBarYData(numByDayOrdered);
  }

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
}
