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
  Tooltip,
  LineController,
  BarController,
  Title,
  Filler,
);



function App() {
  const [datas, setData] = useState(null);
  const [filter,setFilter]=useState('');
  // console.log(filter);

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
  const handleClick = (elements) => {
    // 클릭 이벤트 처리
    if (elements.length > 0) {
      const clickedElement = elements[0];
      if(filter.length===0)
      {
        setFilter(ids[clickedElement.index]);
      }
      else {
        setFilter('')
      }
    }
  };
  const onFilter=(e)=>{
    if(filter.length===0)
    {
      setFilter(e);
    }
    else {
      setFilter('')
    }
    console.log(filter);
  }

  const options = {
    onClick: (event, elements) => {
      handleClick(elements);},
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
          maxTicksLimit: 10, // 최대 10개의 눈금만 표시
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
        backgroundColor: (context)=>{
          return ids[context.dataIndex]===filter?'rgb(87, 65,191)':'rgb(158, 161, 255)';
        },
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
    <Button onClick={()=>onFilter('')} >해제</Button>
    {idCategory.map((data,idx)=> <Button $filter={filter===data} onClick={()=>onFilter(data)} key={data}>{data}</Button>)}
    <Chart options={options} data={data} />;
  </Container>
);
}



export default App;
const Container = styled.div`
width: 90vw;
// max-width: 900px;
margin: 0 auto;
padding: 100px 0px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  border: none;
  border-radius: 2.25rem;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  
  background-color: ${props => (props.$filter? 'red' : 'blue')};
  color: white;

  margin:10px;
  
  &:hover{
    background: #339af0;
}
  &:active{
    background: #1c7ed6;
  }


    /*크기*/
    height: 2rem;
    font-size: 1rem;

`