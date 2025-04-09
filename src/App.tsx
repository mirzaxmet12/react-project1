import { Routes, Route } from 'react-router-dom'
import Layout from './layout/layout'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import AllProducts from './pages/allProducts'

function App() {
  return (
    <Layout>
      <Routes>
        
        <Route path='/' element={<AllProducts />} />
        <Route path="/all-products" element={<AllProducts />} />  
        <Route path="products/category/:name" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />


      </Routes>
    </Layout>
  )
}
export default App
