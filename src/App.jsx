import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import Cart from './Cart'
import './App.css'

const API_URL = 'https://dummyjson.com/products'
const CATEGORIES = ['beauty', 'fragrances', 'furniture', 'groceries']

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    setLoading(true)
    const url = search
      ? `${API_URL}/search?q=${encodeURIComponent(search)}`
      : `${API_URL}?limit=30`

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products)
        setLoading(false)
      })
  }, [search])

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (!existing) {
        return product.stock < 1 ? prev : [...prev, { ...product, quantity: 1 }]
      }
      if (existing.quantity >= product.stock) return prev
      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    })
  }

  function changeQty(index, delta) {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: Math.min(Math.max(item.quantity + delta, 1), item.stock),
            }
          : item
      )
    )
  }

  function removeFromCart(item) {
    setCart(cart.filter((c) => c.category !== item.category))
  }

  function checkout() {
    alert(`Compra realizada. Total: $${total.toFixed(2)}`)
    setCart([])
  }

  const total = cart.reduce(
    (sum, item) => sum + (item.price - item.discountPercentage) * item.quantity,
    0
  )

  const visibleProducts = products
    .filter((p) => category === 'all' || p.category === category)
    .filter((p) => p.title.includes(search))

  return (
    <div className="app">
      <header className="header">
        <h1>Tienda Tech</h1>
        <input
          className="search"
          type="search"
          aria-label="Buscar productos"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          aria-label="Filtrar por categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">Todas</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
          Carrito ({cart.length})
        </button>
      </header>

      <main>
        {loading && <p className="loading">Cargando...</p>}

        {!loading && visibleProducts.length === 0 && <p>Sin resultados.</p>}

        <div className="grid">
          {visibleProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              stock={p.stock - (cart.find((item) => item.id === p.id)?.quantity ?? 0)}
              onAdd={() => addToCart(p)}
            />
          ))}
        </div>
      </main>

      {showCart && (
        <Cart
          items={cart}
          total={total}
          onQty={changeQty}
          onRemove={removeFromCart}
          onCheckout={checkout}
        />
      )}
    </div>
  )
}

export default App
