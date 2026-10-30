import assert from 'node:assert/strict'
import test from 'node:test'
import { getExpenseErrors } from '../src/expenseUtils.js'

test('requires a non-empty title', () => {
  assert.equal(getExpenseErrors('   ', '12').title, 'Enter a title.')
  assert.equal(getExpenseErrors('Groceries', '12').title, undefined)
})

test('rejects empty and non-numeric amounts', () => {
  assert.equal(
    getExpenseErrors('Groceries', '').amount,
    'Enter a valid number for the amount.',
  )
  assert.equal(
    getExpenseErrors('Groceries', 'twelve').amount,
    'Enter a valid number for the amount.',
  )
})

test('rejects zero and negative amounts', () => {
  assert.equal(
    getExpenseErrors('Groceries', '0').amount,
    'Amount must be greater than zero.',
  )
  assert.equal(
    getExpenseErrors('Groceries', '-1').amount,
    'Amount must be greater than zero.',
  )
})

test('accepts a positive numeric amount', () => {
  assert.deepEqual(getExpenseErrors('Groceries', '12.50'), {})
})
