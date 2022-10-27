import './CustomerCard.css';

/*
 * A card that displays the point totals for a particular customer.
 */
function CustomerCard({ customer, transactions }) {

    // Compute points per month and grand total
    const pointsByMonth = _getPointsByMonth(transactions);
    const grandTotal = Object.values(pointsByMonth).reduce(
        (prev, current) => prev + current
    );

    // Build a list item for each month
    const monthlyListItems = Object.entries(pointsByMonth).map(
        ([month, points]) => <li key={month}>{month}: {points}</li>
    );

    return (
        <div className="CustomerCard">
            <h2>{customer}</h2>
            <p>
                <strong>Points by Month:</strong>
            </p>
            <ul>
                {monthlyListItems}
            </ul>
            <p>
                <strong>Total Points:</strong> {grandTotal}
            </p>
        </div>
    );
}

/*
 * Calculate total points for each month.
 */
function _getPointsByMonth(transactions) {
    const monthlyTotals = {};
    transactions.forEach(transaction => {
        const monthStr = _buildMonthString(transaction.timestamp);
        if (monthlyTotals[monthStr] === undefined) monthlyTotals[monthStr] = 0;
        monthlyTotals[monthStr] += _calculatePoints(transaction.dollar_amount);
    });
    return monthlyTotals;
}

/*
 * Build a date string in the format "Month YYYY" from a timestamp.
 */
function _buildMonthString(timestamp) {
    const date = new Date(timestamp);
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
}

/*
 * Calculate the reward points earned from a specified dollar amount.
 */
function _calculatePoints(amount) {
    const doubles = 2 * Math.max(amount - 100, 0);
    const singles = Math.max(amount - 50, 0);
    return doubles + singles;
}

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export default CustomerCard;
