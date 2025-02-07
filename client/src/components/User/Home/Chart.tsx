import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { AppStatusCount } from '../../../types/dataTypes';

interface ChartProps{
    data:AppStatusCount;
}

export default function Chart({data}:ChartProps) {
  return (
    <PieChart

      series={[
        {
          data: [
            { id: 0, value: data.pending, label: `Pending` },
            { id: 1, value: data.accepted, label: 'Accepted' },
            { id: 2, value: data.rejected, label: 'Rejected' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}