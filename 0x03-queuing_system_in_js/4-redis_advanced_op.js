// using the client to store a hash value
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

  // Set fields in a hash
  await client.hSet('HolbertonSchools', 'Portland', '50', redis.print);
  await client.hSet('HolbertonSchools', 'Seattle', '80', redis.print);
  await client.hSet('HolbertonSchools', 'New York', '20', redis.print);
  await client.hSet('HolbertonSchools', 'Bogota', '20', redis.print);
  await client.hSet('HolbertonSchools', 'Cali', '40', redis.print);
  await client.hSet('HolbertonSchools', 'Paris', '2', redis.print);

  // Displaying the objects using hgetall
  const hgetall = await client.hGetAll('HolbertonSchools', redis.print);
  console.log(hgetall);
});
