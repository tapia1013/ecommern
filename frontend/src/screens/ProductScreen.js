import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Card, ListGroup, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductsDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';



const ProductScreen = () => {
  const params = useParams();
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails


  useEffect(() => {
    dispatch(listProductsDetails(params.id))
  }, [dispatch, params])



  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {
        loading
          ? (<Loader />)
          : error
            ? (<Message variant='danger'>{error}</Message>)
            : (
              <Row>
                <Col md={6}>
                  <Image fluid src={product.image} alt={product.name} />
                </Col>

                <Col md={3}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h2>{product.name}</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListGroup.Item>

                    <ListGroup.Item>
                      Price: ${product.price}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      Description: {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col md={3}>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            Price:
                          </Col>

                          <Col>
                            <strong>${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>
                            Status:
                          </Col>

                          <Col>
                            {
                              product.countInStock > 0
                                ? 'In Stock'
                                : 'Out Of Stock'
                            }
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Button
                          className='btn-block'
                          type='button'
                          disabled={product.countInStock === 0}
                        >
                          Add To Card
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            )
      }


    </>
  )
}

export default ProductScreen