import type { Product } from '../types'
import axios from 'axios'

export const handleFetchProducts = (): Promise<Product[] | void> =>
  new Promise(async (res) => {
    try {
      const { data }: { data: Product[] } = await axios.get(
        'http://localhost:3001/products',
      )
      res(data)
    } catch (e) {
      throw new Error('error')
    }
  })
