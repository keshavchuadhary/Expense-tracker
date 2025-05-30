import React from 'react';
import { calculateMovingAverage } from '../../utils/helper';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import moment from 'moment';

const BudgetForecast = ({ expenses }) => {
  const forecast = calculateMovingAverage(expenses);
  const hasAnyData = expenses && expenses.length > 0;
  
  // Generate chart data
  const chartData = Object.entries(
    expenses?.reduce((acc, expense) => {
      const month = moment(expense.date).format('MMM YY');
      acc[month] = (acc[month] || 0) + expense.amount;
      return acc;
    }, {}) || {}
  ).map(([month, amount]) => ({ month, amount }));

  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold mb-4">Budget Forecast</h3>
      
      {!hasAnyData ? (
        <div className="text-center py-6 text-gray-500">
          No expense data available
        </div>
      ) : forecast ? (
        <>
          <div className="mb-4">
            <p className="text-gray-600">
              Predicted next month's spending: 
              <span className="font-bold text-primary ml-2">
                ₹{forecast.toLocaleString()}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Based on {chartData.length} month average
            </p>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#8884d8" 
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="text-center py-6 text-gray-500">
          Collecting more data for accurate forecast
          <div className="mt-2 text-xs">
            (Minimum 1 month of data needed)
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetForecast;