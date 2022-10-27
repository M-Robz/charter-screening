import { useEffect, useRef, useState } from 'react';
import CardList from './CardList';

function App() {

    // State indicating whether the data has been loaded
    const [hasLoaded, setHasLoaded] = useState(false);

    // Holds persistent transaction data for all customers
    const transactions = useRef(null);

    // Fetch transaction data and group by customer
    useEffect(() => {
        fetch('/data/transactions.json', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            transactions.current = _groupByCustomer(data);
            setHasLoaded(true);
        });
    }, []);

    return !hasLoaded ? (
        <p style={{ margin: '1rem' }}>Loading...</p>
    ) : (
        <CardList allTransactions={transactions.current} />
    );
}

/*
 * Restructure raw transaction data as an object grouped by customer.
 */
function _groupByCustomer(rawData) {
    const grouped = {};
    rawData.forEach(record => {
        const { customer } = record;
        if (!grouped[customer]) grouped[customer] = [];
        grouped[customer].push(record);
    });
    return grouped;
}

export default App;
