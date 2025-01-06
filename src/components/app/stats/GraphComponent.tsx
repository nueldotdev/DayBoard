import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getTheme } from '../../../utils/getTheme';


const GraphComponent: React.FC<{ data: { day: string; hours: number, fullDay: string }[]}> = ({ data }) => {
  const { currentTheme } = getTheme();


  return (
    <div className="fill-all">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: currentTheme.chart.tooltip, // Dark gray background
              borderRadius: '8px',                      // Rounded corners
              border: 'none',                           // No border
              color: '#fff',                            // Text color
            }}
            labelStyle={{
              color: '#ccc',                            // Label text color
            }}
            // fill should be a bit transparent, almost barely seen, otherwise it's too bright
            cursor={{fill: currentTheme.chart.cursorFill}}
          />
          <Bar
            dataKey="hours"
            fill="#4CAF50"                               // Default fill color for bars
            radius={[5, 5, 0, 0]}
            onMouseOver={(e) => (e.target.style.fill = '#66BB6A')} // Brighter on hover
            onMouseOut={(e) => (e.target.style.fill = '#4CAF50')}  // Restore color
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphComponent;
