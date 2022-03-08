import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { DAY } from '../pages/index';

interface BarProps {
  title: string;
  xData: string[];
  yData: number[];
}

const SampleBar = (props: BarProps) => {
  let {
    title,
    xData = [DAY.Sun, DAY.Mon, DAY.Tue, DAY.Wed, DAY.Thu, DAY.Fri, DAY.Sat],
    yData = [0, 0, 0, 0, 0, 0, 0],
  } = props;
  const option = {
    title: {
      text: title,
    },
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: xData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: yData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      style={{
        width: '35rem',
        height: '22rem',
        marginTop: '3rem',
      }}
    />
  );
};

export default SampleBar;
