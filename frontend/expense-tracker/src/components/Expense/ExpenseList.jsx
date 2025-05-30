import React, { useState } from 'react'
import { LuDownload, LuCalendar, LuX } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({ 
  transactions, 
  onDelete, 
  onDownload,
  initialSortOrder = 'newest',
  showSort = true,
  customSort 
}) => {
  const [sortOrder, setSortOrder] = useState(initialSortOrder)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  // Sorting options configuration
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
  ]

  // Date filtering logic
  const filterByDateRange = (transaction) => {
    if (!startDate && !endDate) return true
    const transactionDate = moment(transaction.date)
    const start = startDate ? moment(startDate) : null
    const end = endDate ? moment(endDate) : null

    let afterStart = true
    let beforeEnd = true

    if (start) afterStart = transactionDate.isSameOrAfter(start, 'day')
    if (end) beforeEnd = transactionDate.isSameOrBefore(end, 'day')

    return afterStart && beforeEnd
  }

  // Sorting logic handler
  const getSortedTransactions = () => {
    let filtered = transactions.filter(filterByDateRange)
    
    if (customSort) {
      return customSort([...filtered], sortOrder)
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === 'oldest' ? dateA - dateB : dateB - dateA
    })
  }

  const handleSortChange = (e) => setSortOrder(e.target.value)
  const clearFilters = () => {
    setStartDate(null)
    setEndDate(null)
  }

  const sortedTransactions = getSortedTransactions()
  const hasActiveFilters = startDate || endDate

  return (
    <div className='card'>
      <div className='flex justify-between items-center mb-4'>
        <h5 className='text-lg font-semibold'>Expense List</h5>
        <div className='flex gap-3'>
          {showSort && (
            <div className='relative'>
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className='card-btn flex items-center gap-2 pr-8 appearance-none'
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button className='card-btn flex items-center gap-2' onClick={onDownload}>
            <LuDownload className='text-base'/> Download
          </button>
        </div>
      </div>

      {/* Date Filter Controls */}
      <div className='mb-6 flex flex-wrap gap-4 items-center'>
        <div className='flex items-center gap-3'>
          <input
            type='date'
            value={startDate || ''}
            onChange={(e) => setStartDate(e.target.value)}
            className='border rounded-lg px-3 py-2 text-sm'
          />
          <span className='text-gray-500'>to</span>
          <input
            type='date'
            value={endDate || ''}
            onChange={(e) => setEndDate(e.target.value)}
            className='border rounded-lg px-3 py-2 text-sm'
          />
        </div>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className='flex items-center gap-1 text-sm text-red-600 hover:text-red-700'
          >
            <LuX className='inline-block' /> Clear filters
          </button>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {sortedTransactions.length > 0 ? (
          sortedTransactions.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense._id)}
            />
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-500 py-4">
            {hasActiveFilters ? 
              'No expenses found in selected date range' : 
              'No expenses found'
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpenseList