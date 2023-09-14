import React, {useEffect, useState} from 'react';
// import mockData from '/mock_data.json';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title,
  Filler,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import styled from 'styled-components';
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title,
  Filler,
  
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js  Chart - Multi Axis',
    },
  },
  scales: {
    y: {
      display: true,
      position: 'left',
    },
    y1: {
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

function App() {
  const [datas, setData] = useState(null);

  useEffect(()=>{

    const jsonPath = '/mock_data.json';

    // JSON 파일 가져오기
    fetch(jsonPath)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.response)
        setData(result);
      })
      .catch((error) => {
        console.error('Error fetching JSON:', error);
      });

  },[])
 
  if (!datas) {
    return <div>Loading...</div>;
  }
 
  const dates = Object.keys(datas.response);
  const areaData = dates.map((date) => datas.response[date].value_area);
  const valueDatas = dates.map((date) => datas.response[date].value_bar);
  console.log(dates);
  console.log(areaData);
  console.log(valueDatas);

  const data = {
    labels: dates,
    datasets: [
      {
        type: 'line',
        label: 'area',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: true,
        backgroundColor: 'rgb(75, 2, 192)',
        data: areaData,
        yAxisID: 'y'
      },
      {
        type: 'bar',
        label: 'bar',
        backgroundColor: 'rgb(75, 192, 192)',
        data: valueDatas,
        borderColor: 'white',
        borderWidth: 2,
        yAxisID: 'y1'
      },
    ],
  };


  

return (
  <Container>
    <Chart options={options} data={data} />;
  </Container>
);
}



export default App;
const Container = styled.div`
width: 90vw;
max-width: 900px;
`;