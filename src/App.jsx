import { useMemo, useState } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import { CATEGORIES, getExpenseErrors } from './expenseUtils.js'
import './App.css'

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
})

function App() {
  const [expenses, setExpenses] = useState([])
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [type, setType] = useState('expense')
  const [errors, setErrors] = useState({})
  const [filter, setFilter] = useState('All')

  const displayedExpenses = useMemo(
    () =>
      filter === 'All'
        ? expenses
        : expenses.filter((expense) => expense.category === filter),
    [expenses, filter],
  )
  const displayedIncome = displayedExpenses
    .filter((entry) => entry.type === 'income')
    .reduce((total, entry) => total + entry.amount, 0)
  const displayedExpense = displayedExpenses
    .filter((entry) => entry.type === 'expense')
    .reduce((total, entry) => total + entry.amount, 0)
  const displayedBalance = displayedIncome - displayedExpense

  function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = getExpenseErrors(title, amount)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setExpenses((currentExpenses) => [
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        amount: Number(amount),
        category,
        type,
      },
      ...currentExpenses,
    ])
    setTitle('')
    setAmount('')
    setCategory(CATEGORIES[0])
    setType('expense')
  }

  function handleDelete(id) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    )
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Pennywise home">
          <span className="brand-mark" aria-hidden="true">₹</span>
          <span>Pennywise</span>
        </a>
        <span className="topbar-note">Your money, in good company.</span>
      </header>

      <main className="main-content">
        <section className="page-heading" aria-labelledby="page-title">
          <div>
            <p className="eyebrow">PERSONAL FINANCE</p>
            <h1 id="page-title">Income &amp; expense tracker</h1>
            <p className="page-description">
              A clearer picture of where your money goes.
            </p>
          </div>
          <div className="total-card" aria-live="polite">
            <span className="total-label">
              {filter === 'All' ? 'Balance' : `${filter} balance`}
            </span>
            <strong className={displayedBalance < 0 ? 'negative-balance' : 'positive-balance'}>
              {currency.format(displayedBalance)}
            </strong>
            <span className="total-caption">
              <span className="income-summary">Income {currency.format(displayedIncome)}</span>
              <span aria-hidden="true"> · </span>
              <span className="expense-summary">Expenses {currency.format(displayedExpense)}</span>
            </span>
          </div>
        </section>

        <div className="dashboard">
          <ExpenseForm
            amount={amount}
            category={category}
            categories={CATEGORIES}
            errors={errors}
            onTypeChange={setType}
            type={type}
            onAmountChange={(value) => {
              setAmount(value)
              if (errors.amount) setErrors((current) => ({ ...current, amount: '' }))
            }}
            onCategoryChange={setCategory}
            onSubmit={handleSubmit}
            onTitleChange={(value) => {
              setTitle(value)
              if (errors.title) setErrors((current) => ({ ...current, title: '' }))
            }}
            title={title}
          />

          <ExpenseList
            categories={CATEGORIES}
            expenses={displayedExpenses}
            filter={filter}
            formatCurrency={currency.format}
            onDelete={handleDelete}
            onFilterChange={setFilter}
          />
        </div>
      </main>
      <footer className="footer">
        <span>Small steps add up.</span>
        <span>Made for mindful spending</span>
      </footer>
    </div>
  )
}

export default App
