import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { mobile } from '../responsive'
import { Add, Remove } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { get_product_type } from '../data'
import { useCart } from '../context/CartContext'

const Container = styled.div``

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: '10px', flexDirection: 'column' })}
`

const ImgContainer = styled.div`
  flex: 1;
`

const Image = styled.img`
  width: 85%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: '40vh' })}
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: '10px' })}
`

const Title = styled.h1`
  font-weight: 200;
`

const Desc = styled.p`
  margin: 20px 0px;
`

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`

// const FilterContainer = styled.div`
//   width: 50%;
//   margin: 30px 0px;
//   display: flex;
//   justify-content: space-between;
//   ${mobile({ width: '100%' })}
// `

// const Filter = styled.div`
//   display: flex;
//   align-items: center;
// `

// const FilterTitle = styled.span`
//   font-size: 20px;
//   font-weight: 200;
// `

// const FilterColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
//   margin: 0px 5px;
//   cursor: pointer;
// `

// const FilterSize = styled.select`
//   margin-left: 10px;
//   padding: 5px;
// `

// const FilterSizeOption = styled.option``

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: '100%' })}
`

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`

const Product = () => {
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const type_product = useLocation().pathname.split('/')[2]
  const id = useLocation().pathname.split('/')[3]
  const product_url = get_product_type(type_product)
  console.log(type_product)

  const { cart } = useCart()
  console.log(cart)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:800${product_url}/${type_product}s/${id}`
      )
      console.log(res.data)
      setProduct(res.data)
    }
    fetchData()
  }, [product_url, type_product, id])

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1)
    } else {
      setQuantity(quantity + 1)
    }
  }
  console.log(cart.cart_id)

  const handleClick = async () => {
    try {
      const res = await axios.post('http://localhost:8004/add-to-cart/', {
        quantity: quantity,
        product_id: id,
        type_product: type_product,
        cart: cart.cart_id,
      })
      console.log(res.data)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image
            src={
              product.image ||
              'https://images.pexels.com/photos/5499132/pexels-photo-5499132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
          />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.description}</Desc>
          <Price>$ {product.price}</Price>
          {/* <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer> */}
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity('dec')} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity('inc')} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Product
