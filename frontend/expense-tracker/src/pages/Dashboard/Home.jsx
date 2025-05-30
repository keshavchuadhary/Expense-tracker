import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import InfoCard from '../../components/Cards/InfoCard'
import { addThousandsSeparator } from '../../utils/helper'
import { IoMdCard } from 'react-icons/io'
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import RecentTransaction from '../../components/Dashboard/RecentTransaction'
import FinanceOverview from '../../components/Dashboard/FinanceOverview'
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions'
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses'
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart'
import RecentIncome from "../../components/Dashboard/RecentIncome"
import BudgetForecast from './BudgetForecast'
import moment from 'moment'

const Home = () => {
    useUserAuth();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchDashboardData = async () => {
        if(loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
            if(response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    }

    const filterTransactions = (transactions) => {
        if (!transactions) return [];
        return transactions.filter(transaction => {
            const searchLower = searchQuery.toLowerCase();
            const categoryMatch = transaction.category?.toLowerCase().includes(searchLower);
            const sourceMatch = transaction.source?.toLowerCase().includes(searchLower);
            const amountMatch = transaction.amount?.toString().includes(searchQuery);
            const dateMatch = moment(transaction.date).format('MMM DD, YYYY').toLowerCase().includes(searchLower);
            
            return categoryMatch || sourceMatch || amountMatch || dateMatch;
        });
    };

    // Get all transactions from different sources
    const getAllTransactions = () => {
        return [
            ...(dashboardData?.recentTransactions || []),
            ...(dashboardData?.last30DaysExpenses?.transactions || []),
            ...(dashboardData?.last60DaysIncome?.transactions || [])
        ];
    };

    // Remove duplicate transactions
    const getUniqueTransactions = (transactions) => {
        return transactions.filter((tx, index, self) =>
            index === self.findIndex(t => t._id === tx._id)
        );
    };

    // Calculate filtered totals
    const calculateFilteredTotals = (transactions) => {
        return transactions.reduce((acc, tx) => {
            if (tx.type === 'income') acc.income += tx.amount;
            if (tx.type === 'expense') acc.expense += tx.amount;
            return acc;
        }, { income: 0, expense: 0 });
    };

    // Processed data
    const allTransactions = getAllTransactions();
    const filteredTransactions = filterTransactions(allTransactions);
    const uniqueTransactions = getUniqueTransactions(filteredTransactions);
    const { income: filteredIncome, expense: filteredExpense } = calculateFilteredTotals(uniqueTransactions);
    const filteredBalance = filteredIncome - filteredExpense;

    // Component-specific filtered data
    const filteredRecentTransactions = filterTransactions(dashboardData?.recentTransactions);
    const filteredExpenseTransactions = filterTransactions(dashboardData?.last30DaysExpenses?.transactions);
    const filteredIncomeTransactions = filterTransactions(dashboardData?.last60DaysIncome?.transactions);

    useEffect(() => {
        fetchDashboardData();
        return () => {}
    }, []);

    return (
        <DashboardLayout activeMenu="dashboard">
            <div className='my-5 mx-auto'>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 '>
                    <InfoCard
                        icon={<IoMdCard/>}
                        label="Total Balance"
                        value={addThousandsSeparator(filteredBalance || 0)}
                        color="bg-primary"
                    />
                    <InfoCard
                        icon={<LuWalletMinimal/>}
                        label="Total Income"
                        value={addThousandsSeparator(filteredIncome || 0)}
                        color="bg-orange-500"
                    /> 
                    <InfoCard
                        icon={<LuHandCoins/>}
                        label="Total Expense"
                        value={addThousandsSeparator(filteredExpense || 0)}
                        color="bg-red-500"
                    />   
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    <RecentTransaction
                      transactions={filteredRecentTransactions}
                      onSeeMore={() => navigate("/expense")}
                    />

                    <FinanceOverview
                      totalBalance={filteredBalance || 0}
                      totalIncome={filteredIncome || 0}
                      totalExpense={filteredExpense || 0}
                      searchQuery={searchQuery}
                    />

                    <ExpenseTransactions
                        transaction={filteredExpenseTransactions || []}
                        onSeeMore={() => navigate("/expense")}
                    />

                    <Last30DaysExpenses
                        data={filteredExpenseTransactions || []}
                    />

                    <RecentIncomeWithChart
                        data={filteredIncomeTransactions?.slice(0,4) || []}
                        totalIncome={filteredIncome || 0}
                    />   

                    <RecentIncome
                        transactions={filteredIncomeTransactions || []}
                        onSeeMore={() => navigate("/income")}
                    />  

                    <BudgetForecast expenses={filteredExpenseTransactions || []} />              
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Home