import { createContext } from 'preact'
import { ReactNode, useEffect, useState } from 'preact/compat'

interface ITransaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createAt: string
}

interface ITransactionsContextType {
  transactions: ITransaction[]
}

export const TransactionContext = createContext({} as ITransactionsContextType)

interface ITransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  )
}
