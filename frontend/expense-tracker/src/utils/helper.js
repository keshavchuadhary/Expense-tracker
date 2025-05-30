import moment from "moment";
import { data } from "react-router-dom";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if(!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num === null || num === undefined) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));
  return chartData;
}

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Remove the extra array wrapping each object
  const chartData = sortedData.map((item) => ({
    month: moment(item.date).format('DD MMM'),
    amount: item?.amount,
    
  }));
  
  return chartData;
};


export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.data).format('Do MMM'),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
}

export const calculateMovingAverage = (transactions, months = 3) => {
  if (!transactions || transactions.length === 0) return null;
  
  const monthlyTotals = {};
  
  transactions.forEach(transaction => {
    const monthYear = moment(transaction.date).format('YYYY-MM');
    monthlyTotals[monthYear] = (monthlyTotals[monthYear] || 0) + transaction.amount;
  });

  const sortedMonths = Object.keys(monthlyTotals).sort();
  const availableMonths = Math.min(sortedMonths.length, months);
  
  if (availableMonths === 0) return null;

  const lastNMonths = sortedMonths.slice(-availableMonths);
  const sum = lastNMonths.reduce((acc, month) => acc + monthlyTotals[month], 0);
  
  return Math.round(sum / availableMonths);
};