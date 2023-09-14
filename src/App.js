import { useRef,useEffect } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
function App() {
  const chartRef = useRef(null);
  const options = {
    scales: {
        x: {
            type: 'category',
            labels: ['January', 'February', 'March', 'April', 'May'],
        },
        // 다른 스케일 설정
    },
    // 다른 옵션 설정
};
  useEffect(() => {
      // 이전 차트 제거
      if (chartRef.current) {
          const chartInstance = chartRef.current.chartInstance;
          if (chartInstance) {
              chartInstance.destroy();
          }
      }
  }, []);


  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
        {
            label: 'Sales Data',
            fill: false,
            lineTension: 0.1,
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56],
        },
    ],
};
  

return (
  <Container>
    <Line  ref={chartRef} type="line" data={data} options={options} />
  </Container>
);
}

export default App;
const Container = styled.div`
width: 90vw;
max-width: 900px;
`;