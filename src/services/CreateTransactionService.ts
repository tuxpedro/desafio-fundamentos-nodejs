import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string
  type: 'income' | 'outcome'
  value: number
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RequestDTO): Transaction {

    const { total } = this.transactionsRepository.getBalance()

    if (type === 'outcome' && total < value)
      throw Error('The transaction was not possible, there is no balance available')

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })
    return transaction
  }
}

export default CreateTransactionService;
