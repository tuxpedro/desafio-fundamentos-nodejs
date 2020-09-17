import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    return this.transactions.reduce(function (balance, transaction) {
      const { value, type } = transaction

      if (!balance[type]) balance[type] = 0

      balance[type] += value
      balance['total'] = balance['income'] - balance['outcome']

      return balance
    }, {
      income: 0,
      outcome: 0,
      total: 0
    })
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type
    })

    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository;
