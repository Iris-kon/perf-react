import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react'
import { SearchResults } from '../components/SeachResults'

type IResults = {
  totalPrice: number
  data: Array<{
    id: number
    title: string
    price: number
    formatedPrice: string
  }> 
}


const Home: NextPage = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<IResults>({
    totalPrice: 0,
    data: []
  })
  
  async function handleSearch(event: FormEvent) {
    event.preventDefault()

    if(!search.trim()) return

    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    const totalPrice = data.reduce((total: number, product: { price: number }) => {
      return total + product.price
    }, 0)

    const formatedData = data.map((product: any) => ({
      ...product,
      formatedPrice: formatter.format(product.price)
    }))

    setResults({totalPrice, data: formatedData})
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />
        <button type='submit'>
          buscar
        </button>
      </form>

      <SearchResults 
        results={results.data} 
        onAddToWishlist={addToWishlist} 
        totalPrice={results.totalPrice}
      />
    </div>
  )
}

export default Home
