import CustomerCard from './CustomerCard';
import './CardList.css';

/*
 * A list of customer cards.
 */
function CardList({ allTransactions }) {
    return (
        <div className="CardList">
            { Object.entries(allTransactions).map(([customer, transactions]) => (
                <CustomerCard
                    key={customer}
                    customer={customer}
                    transactions={transactions}
                />
            )) }
        </div>
    );
}

export default CardList;
