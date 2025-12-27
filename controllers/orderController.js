import Order from '../models/order.js';
import { isCustomer } from "../controllers/userController.js";

export async function createOrder(req, res) {

 
  if (!isCustomer(req)) {
    return res.status(401).json({
      message: "Please login as customer to place orders"
    });
  }

  try {
    const latestOrder = await Order.find()
      .sort({ orderDate: -1 })
      .limit(1);

    let orderId;

    if (latestOrder.length === 0) {
      orderId = "CBC0001";
    } else {
      const currentOrderId = latestOrder[0].orderId;
      const number = parseInt(currentOrderId.replace("CBC", ""));
      orderId = "CBC" + String(number + 1).padStart(4, "0");
    }

    const newOrderData = req.body;
    newOrderData.orderId = orderId;
    newOrderData.userEmail = req.user.email;

    const newOrder = new Order(newOrderData);
    await newOrder.save();

    res.json({ message: "order created successfully", orderId });

  } catch (error) {
    res.status(500).json({
      message: "order creation failed",
      error: error.message
    });
  }
}

export async function getOrders(req, res) {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "error fetching orders",
      error: error.message
    });
  }
}
