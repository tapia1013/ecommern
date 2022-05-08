import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';


// @desc     Create new order
// @route    POST /api/orders
// @access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  // bring the data from the front end/req.body
  const {
    orderIems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body

  // check to see if order if no orders throw error, else create new order
  if (orderIems && orderIems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    // if there is an order create new order
    const order = new Order({
      orderIems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    // save to db
    const createdOrder = await order.save()

    // response with 201 = created, and repond with info
    res.status(201).json(createdOrder)
  }
})


export { addOrderItems }