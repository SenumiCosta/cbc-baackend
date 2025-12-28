import Order from '../models/order.js';
import Product from '../models/product.js';
import { isCustomer } from "../controllers/userController.js";

export async function createOrder(req, res) {

  if (!isCustomer(req)) {
    return res.status(403).json({
      message: "Please login as customer to place orders"
    });
  }

  try {
    const latestOrder = await Order.find()
      .sort({ orderDate: -1 })
      .limit(1);

    let orderId = "CBC0001";

    if (latestOrder.length > 0) {
      const currentOrderId = latestOrder[0].orderId ?? "CBC0000";
      const number = parseInt(currentOrderId.replace("CBC", ""), 10) || 0;
      orderId = "CBC" + String(number + 1).padStart(4, "0");
    }

    const newOrderData = { ...req.body };
    const requestedProducts = Array.isArray(newOrderData.products)
      ? newOrderData.products
      : [];

    if (requestedProducts.length === 0) {
      return res.status(400).json({
        message: "Please include at least one product in the order"
      });
    }

    const orderedItems = [];

    // Hydrate requested items with the latest product data before persisting the order
    for (const requestedProduct of requestedProducts) {
      const productDoc = await Product.findOne({
        productId: requestedProduct.productId
      });

      if (!productDoc) {
        return res.status(404).json({
          message: `Product with id ${requestedProduct.productId} not found`
        });
      }

      const primaryImage =
        productDoc.images && productDoc.images.length > 0
          ? productDoc.images[0]
          : null;

      if (!primaryImage) {
        return res.status(400).json({
          message: `Product with id ${requestedProduct.productId} is missing a primary image`
        });
      }

      orderedItems.push({
        name: productDoc.productName,
        quantity: requestedProduct.quantity ?? 1,
        image: primaryImage,
        price: productDoc.price
      });
    }

    newOrderData.orderedItems = orderedItems;
    newOrderData.totalAmount = orderedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    newOrderData.orderId = orderId;
    newOrderData.userEmail = req.user.email;
    delete newOrderData.products;

    const newOrder = new Order(newOrderData);
    await newOrder.save();

    return res.json({ message: "order created successfully", orderId });

  } catch (error) {
    return res.status(500).json({
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
