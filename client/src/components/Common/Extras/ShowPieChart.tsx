import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';


export default function ShowPieChart() {
  return (
    <PieChart

      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Pending' },
            { id: 1, value: 20, label: 'Accepted' },
            { id: 2, value: 30, label: 'Rejected' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}