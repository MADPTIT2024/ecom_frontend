import styled from 'styled-components'
import { popularProducts } from '../data'
import Product from './Product'

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const Products = ({ products }) => {
  return (
    <Container>
      {products?.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  )
}

export default Products
