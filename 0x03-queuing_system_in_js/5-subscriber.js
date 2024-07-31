import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Log a message when connected
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Log an error message when there's an error
client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});

// Subscribe to the "holberton school channel"
client.subscribe('holberton school channel');

// Log received messages on the channel
client.on('message', (channel, message) => {
  console.log(`Received message on channel ${channel}: ${message}`);

  // Unsubscribe and quit if the message is "KILL_SERVER"
  if (message === 'KILL_SERVER') {
    client.unsubscribe();
    client.quit();
  }
});
