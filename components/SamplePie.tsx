import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

export interface PieDataItem {
  value: number;
  name: string;
}

interface PieProps {
  title: string;
  data: PieDataItem[] | any;
}

const SamplePie = (props: PieProps) => {
  let { title, data = [{}] } = props;

  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      left: 'left',
      top: '10%',
      formatter: function (name) {
        const data: PieDataItem[] = option.series[0].data;
        let total = 0;
        let tarValue;
        for (let i = 0, l = data.length; i < l; i++) {
          total += data[i].value;
          if (data[i].name == name) {
            tarValue = data[i].value;
          }
        }
        const p = ((tarValue / total) * 100).toFixed(2);
        return name + ' ' + ' ' + '(' + p + '%)';
      },
    },
    title: {
      text: title,
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{
        width: '40rem',
        height: '25rem',
      }}
    />
  );
};

export default SamplePie;
