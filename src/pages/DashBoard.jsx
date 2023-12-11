import React from 'react'
import { Chart } from 'react-chartjs-2';

const DATA = [
    1,
    2,
    3,
    4,
    5
]

const DashBoard = () => {

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'Dataset 1',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
          },
          {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: 'rgb(75, 192, 192)',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'white',
            borderWidth: 2,
          },
          {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: 'rgb(53, 162, 235)',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
          },
        ],
      };

    const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

  return (
    <Chart
        type={'bar'}
        options={options}
        data={data}
    />
  )
}

export default DashBoard