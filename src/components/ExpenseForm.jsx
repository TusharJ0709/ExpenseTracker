function ExpenseForm({
  amount,
  category,
  categories,
  errors,
  onAmountChange,
  onCategoryChange,
  onSubmit,
  onTitleChange,
  onTypeChange,
  title,
  type,
}) {
  const isIncome = type === 'income'

  return (
    <section className="panel form-panel" aria-labelledby="add-expense-title">
      <div className="panel-heading">
        <div className="panel-icon add-icon" aria-hidden="true">+</div>
        <div>
          <h2 id="add-expense-title">Add {isIncome ? 'income' : 'an expense'}</h2>
          <p>{isIncome ? 'Record money you have received.' : 'Keep track of a recent purchase.'}</p>
        </div>
      </div>

      <form className="expense-form" onSubmit={onSubmit} noValidate>
        <span className="form-label">Entry type</span>
        <div className="type-toggle" role="group" aria-label="Entry type">
          <button
            aria-pressed={!isIncome}
            className={`type-option expense-option${isIncome ? '' : ' active'}`}
            onClick={() => onTypeChange('expense')}
            type="button"
          >
            Expense
          </button>
          <button
            aria-pressed={isIncome}
            className={`type-option income-option${isIncome ? ' active' : ''}`}
            onClick={() => onTypeChange('income')}
            type="button"
          >
            Income
          </button>
        </div>

        <label htmlFor="expense-title">{isIncome ? 'Income source' : 'Expense title'}</label>
        <input
          autoComplete="off"
          id="expense-title"
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder={isIncome ? 'e.g. Monthly salary' : 'e.g. Coffee with friends'}
          value={title}
          aria-describedby={errors.title ? 'title-error' : undefined}
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title && <p className="field-error" id="title-error">{errors.title}</p>}

        <label htmlFor="expense-amount">Amount</label>
        <div className="amount-input">
          <span aria-hidden="true">₹</span>
          <input
            id="expense-amount"
            inputMode="decimal"
            onChange={(event) => onAmountChange(event.target.value)}
            placeholder="0.00"
            value={amount}
            aria-describedby={errors.amount ? 'amount-error' : undefined}
            aria-invalid={Boolean(errors.amount)}
          />
        </div>
        {errors.amount && <p className="field-error" id="amount-error">{errors.amount}</p>}

        <label htmlFor="expense-category">Category</label>
        <select
          id="expense-category"
          onChange={(event) => onCategoryChange(event.target.value)}
          value={category}
        >
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <button className="submit-button" type="submit">
          <span aria-hidden="true">+</span>
          Add {isIncome ? 'income' : 'expense'}
        </button>
      </form>
    </section>
  )
}

export default ExpenseForm
