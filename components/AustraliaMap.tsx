import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

export interface MapDataItem {
  value: number;
  name: string;
}

export interface MapProps {
  title?: string;
  minNum?: number;
  maxNum?: number;
  data?: MapDataItem[];
}

const AustraliaMap = (props: MapProps) => {
  const {
    title = 'Australia Map',
    data = [],
    minNum = 10,
    maxNum = 1000,
  } = props;

  echarts.registerMap('Australia', require('../assets/Australia.json'));
  return (
    <ReactECharts
      echarts={echarts}
      style={{ height: '80vh' }}
      option={{
        title: {
          text: title,
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
        },
        visualMap: {
          left: 'center',
          orient: 'horizontal',
          min: minNum,
          max: maxNum,
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026',
            ],
          },
          text: ['High', 'Low'],
          calculable: true,
        },
        series: [
          {
            name: 'Requested Sample Amount',
            zoom: 1,
            type: 'map',
            map: 'Australia',
            emphasis: {
              label: {
                show: true,
              },
            },
            data: data,
          },
        ],
      }}
    />
  );
};

export default AustraliaMap;
