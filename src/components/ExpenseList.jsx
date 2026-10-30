import ExpenseItem from './ExpenseItem.jsx'

function ExpenseList({
  categories,
  expenses,
  filter,
  formatCurrency,
  onDelete,
  onFilterChange,
}) {
  const filters = ['All', ...categories]

  return (
    <section className="panel list-panel" aria-labelledby="expenses-title">
      <div className="list-heading">
        <div className="panel-heading">
          <div className="panel-icon list-icon" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M7 5h9M7 10h9M7 15h9M3.5 5h.01M3.5 10h.01M3.5 15h.01" />
            </svg>
          </div>
          <div>
            <h2 id="expenses-title">Recent activity</h2>
            <p>Review your income and spending.</p>
          </div>
        </div>
        <span className="expense-count" aria-live="polite">
          {expenses.length} {expenses.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      <div className="filter-bar" aria-label="Filter expenses by category">
        {filters.map((item) => (
          <button
            aria-pressed={filter === item}
            className={`filter-button${filter === item ? ' active' : ''}`}
            key={item}
            onClick={() => onFilterChange(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      {expenses.length > 0 ? (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <ExpenseItem
              expense={expense}
              formatCurrency={formatCurrency}
              key={expense.id}
              onDelete={onDelete}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">◎</span>
          <h3>{filter === 'All' ? 'Nothing to track yet' : `No ${filter.toLowerCase()} entries`}</h3>
          <p>
            {filter === 'All'
              ? 'Add your first income or expense to get started.'
              : 'Try another category or add a new entry.'}
          </p>
        </div>
      )}
    </section>
  )
}

export default ExpenseList
