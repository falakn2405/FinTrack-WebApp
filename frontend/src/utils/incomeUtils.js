import moment from 'moment'

const groupByFormat = (transactions, format) => {
    const result = {}

    transactions.forEach((t) => {
        const date = moment(t.date)
        if (!date.isValid()) return

        const key = date.format(format)
        result[key] = (result[key] || 0) + parseFloat(t.amount || 0)
    })

    return result
}

// ✅ 7 Days
export const get7DayIncomeData = (transactions = []) => {
    const dataMap = groupByFormat(transactions, 'D MMM')

    const days = []
    let current = moment().subtract(6, 'days').startOf('day')
    const end = moment().endOf('day')

    while (current.isSameOrBefore(end, 'day')) {
        const label = current.format('D MMM')
        days.push({
            day: label,
            income: Number((dataMap[label] || 0).toFixed(2)),
        })
        current.add(1, 'day')
    }

    return days
}

// ✅ Monthly (last 30 days)
export const get30DayIncomeData = (transactions = []) => {
    const dataMap = groupByFormat(transactions, 'D MMM')

    const days = []
    let current = moment().subtract(29, 'days').startOf('day')
    const end = moment().endOf('day')

    while (current.isSameOrBefore(end, 'day')) {
        const label = current.format('D MMM')
        days.push({
            day: label,
            income: Number((dataMap[label] || 0).toFixed(2)),
        })
        current.add(1, 'day')
    }

    return days
}

// ✅ Yearly (group by month)
export const getYearlyIncomeData = (transactions = []) => {
    const dataMap = groupByFormat(transactions, 'MMM YYYY')

    const months = []
    let current = moment().startOf('year')
    const end = moment().endOf('year')

    while (current.isSameOrBefore(end, 'month')) {
        const label = current.format('MMM YYYY')
        months.push({
            day: label,
            income: Number((dataMap[label] || 0).toFixed(2)),
        })
        current.add(1, 'month')
    }

    return months
}