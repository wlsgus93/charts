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



function App() {
  const [datas, setData] = useState(null);

  useEffect(()=>{
    const jsonPath = '/mock_data.json';
    // JSON 파일 가져오기
    fetch(jsonPath)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.response)
        setData(result);
      })
      .catch((error) => {
        console.error('Error fetching JSON:', error);
      });

  },[])
  const options = {
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
      tooltip: {
        // backgroundColor: 'rgba(255,255,255,0.8)',
        // titleFont: { size: 20 },
        // bodyFont: { size: 20, color: '#000' }
        callbacks:{
          title: function(tooltipItems, data) {
            let dataIndex = tooltipItems[0].dataIndex;
            return ids[dataIndex];
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 10, // 최대 5개의 눈금만 표시
        },
      },
      y: {
        display: true,
        position: 'left',
        max:200,
        title:{
          display: true,
          text:'Area'
        }
      },
      y1: {
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title:{
          display: true,
          text:'Bar'
        }
      },
    },
  };
  if (!datas) {
    return <div>Loading...</div>;
  }


  const dates = Object.keys(datas.response);
  let datesSplit=dates.map(date=>date.split(" ")[1]);
  
  const areaData = dates.map((date) => datas.response[date].value_area);
  const valueDatas = dates.map((date) => datas.response[date].value_bar);
  const ids= dates.map((date) => datas.response[date].id);
  let idCategory=new Set(ids);
  idCategory= Array.from(idCategory);
  const data = {
    labels: datesSplit,
    datasets: [
      {
        type: 'line',
        label: 'area',
        borderWidth: 0,
        pointRadius :0,
        fill: true,
        backgroundColor: 'rgb(241, 134,143)',
        data: areaData,
        yAxisID: 'y',
        tension: 0.4,
      },
      {
        type: 'bar',
        label: 'bar',
        backgroundColor: 'rgb(75, 192, 192)',
        data: valueDatas,
        borderColor: 'white',
        borderWidth: 2,
        yAxisID: 'y1',
        barThickness: 10
      },
    ],
  };


  

return (
  <Container>
    <button >해제</button>
    {idCategory.map((data,idx)=> <button key={data}>{data}</button>)}
    <Chart options={options} data={data} />;
  </Container>
);
}



export default App;
const Container = styled.div`
width: 90vw;
// max-width: 900px;
`;