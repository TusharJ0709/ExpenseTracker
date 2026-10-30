export const CATEGORIES = ['Food', 'Travel', 'Bills', 'Other']

export function getExpenseErrors(title, amount) {
  const errors = {}
  const trimmedAmount = amount.trim()

  if (!title.trim()) {
    errors.title = 'Enter a title.'
  }

  if (trimmedAmount === '' || !Number.isFinite(Number(trimmedAmount))) {
    errors.amount = 'Enter a valid number for the amount.'
  } else if (Number(trimmedAmount) <= 0) {
    errors.amount = 'Amount must be greater than zero.'
  }

  return errors
}
