import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { addThousandsSeparator } from '../../utils/helper';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const RecentIncomeWithChart = ({ data, totalIncome}) => {
    
    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        })) || [];

        setChartData(dataArr);
    }

    useEffect(() => {
        prepareChartData();

        return () => {};
    }, [data])

    return (
        <div className="card">
            <div className='flex items-center justify-between mb-4'>
                <h5 className='text-lg'>Last 60 Days Income</h5>
            </div>

            <div style={{height: '400px', position: 'relative'}}>
                <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={COLORS}
            />
            </div>
        </div>
    );
};

export default RecentIncomeWithChart;