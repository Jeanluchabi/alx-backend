// Install Redis client using npm
import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Handle connection events
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log('Redis client not connected to server: ', err.message);
});

// Connect to the Redis server
client.connect();

// Ensure the connection is established before performing operations
client.on('ready', async () => {
  console.log('Redis client ready');
});
