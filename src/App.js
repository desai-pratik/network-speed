import React, { useState } from 'react';
import { useNetworkState } from 'react-use';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { ReactInternetSpeedMeter } from 'react-internet-meter';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);
const App = () => {
  const [ischartshow,setIschartshow] = useState(false)
  const currentSpeed = useNetworkState();
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  function handelClick(){
    setIschartshow(true)
  }
  const currentSpeedData = {
    // labels: ['Current Speed', 'Remaining'],
    datasets: [
      {
        label: 'Current Speed',
        data: [
          currentSpeed.downlink,
          100 - currentSpeed.downlink
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          '#e2e2e288'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          '#e2e2e288'
        ],
        borderWidth: 1
      }
    ]
  };

  const downloadSpeedData = {
    // labels: ['Download Speed', 'Remaining'],
    datasets: [
      {
        label: 'Download Speed',
        data: [
          downloadSpeed,
          100 - downloadSpeed
        ],
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          '#e2e2e288'
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          '#e2e2e288'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h3 className='text-center'>Internet Speed Test</h3>
      <button className='btn btn-info mx-auto d-block' onClick={handelClick}>Test Speed</button>
      {ischartshow && <div className=" d-flex justify-content-center gap-5 ">
        <div className="">
        <Doughnut data={currentSpeedData} />
        <p className='text-center'>Network {currentSpeed.downlink} MB</p>
        </div>
        <div className="">
        <Doughnut data={downloadSpeedData} />
        <p className='text-center'>Download {downloadSpeed} MB</p>
        </div>
      </div>}
      <div>
        <ReactInternetSpeedMeter
          txtSubHeading="Checking the speed"
          outputType="empty"
          customClassName={null}
          txtMainHeading="Opps..."
          pingInterval={50}
          thresholdUnit="megabyte"
          threshold={100}
          imageUrl="https://images.pexels.com/photos/3396664/pexels-photo-3396664.jpeg?cs=srgb&dl=pexels-josiah-farrow-3396664.jpg&fm=jpg"
          downloadSize="1781287"
          callbackFun
          callbackFunctionOnNetworkTest={(downloadSpeed) => {
            setDownloadSpeed(downloadSpeed);
          }}
        />
      </div>
    </div>
  );
};

export default App;
