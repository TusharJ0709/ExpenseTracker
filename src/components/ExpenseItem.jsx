function ExpenseItem({ expense, formatCurrency, onDelete }) {
  return (
    <li className="expense-row">
      <span className={`category-icon category-${expense.category.toLowerCase()}`} aria-hidden="true">
        {expense.category === 'Food' && 'F'}
        {expense.category === 'Travel' && 'T'}
        {expense.category === 'Bills' && 'B'}
        {expense.category === 'Other' && 'O'}
      </span>
      <div className="expense-details">
        <span className="expense-title">{expense.title}</span>
        <span className={`category-tag tag-${expense.category.toLowerCase()}`}>
          {expense.category}
        </span>
      </div>
      <strong className={`transaction-amount ${expense.type}-amount`}>
        {expense.type === 'income' ? '+' : '−'}{formatCurrency(expense.amount)}
      </strong>
      <button
        aria-label={`Delete ${expense.title}`}
        className="delete-button"
        onClick={() => onDelete(expense.id)}
        type="button"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
          <path d="M4.5 6h11M8 6V4.5h4V6m2.5 0-.6 9h-5.8l-.6-9m2.5 2.5v4m2-4v4" />
        </svg>
      </button>
    </li>
  )
}

export default ExpenseItem
