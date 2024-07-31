import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const app = express();
const client = createClient();

client.on('error', (err) => console.error('Redis client error', err));
client.on('connect', () => console.log('Redis client connected'));

await client.connect();

const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

// Function to get a product by its ID
const getItemById = (id) => {
  return listProducts.find((product) => product.id === id);
};

// Function to reserve stock for a product by its ID
const reserveStockById = (itemId, stock) => {
  const setAsync = promisify(client.set).bind(client);
  return setAsync(`item.${itemId}`, stock);
};

// Function to get the current reserved stock for a product by its ID
const getCurrentReservedStockById = async (itemId) => {
  const getAsync = promisify(client.get).bind(client);
  const reservedStock = await getAsync(`item.${itemId}`);
  return reservedStock ? parseInt(reservedStock) : 0;
};

// Route to get the list of products
app.get('/list_products', (_req, res) => {
  res.json(listProducts.map((product) => ({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock
  })));
});

// Route to get a specific product by its ID
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);
  if (product) {
    const currentQuantity = await getCurrentReservedStockById(itemId);
    res.json({
      itemId: product.id,
      itemName: product.name,
      price: product.price,
      initialAvailableQuantity: product.stock,
      currentQuantity
    });
  } else {
    res.json({ status: 'Product not found' });
  }
});

// Route to reserve a product by its ID
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);
  if (product) {
    const currentQuantity = await getCurrentReservedStockById(itemId);
    if (currentQuantity < product.stock) {
      await reserveStockById(itemId, currentQuantity + 1);
      res.json({ status: 'Reservation confirmed', itemId: product.id });
    } else {
      res.json({ status: 'Not enough stock available', itemId: product.id });
    }
  } else {
    res.json({ status: 'Product not found' });
  }
});

// Start the server
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});
