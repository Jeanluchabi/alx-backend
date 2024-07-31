import redis from 'redis';

// Create Redis client
const client = redis.createClient();

// Log on connect
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Log on error
client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});

// Function to publish message after a certain time
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    client.publish('holberton school channel', message, (err, reply) => {
      if (err) {
        console.error(`Failed to publish message: ${err.message}`);
      } else {
        console.log(`Message published: ${reply}`);
      }
    });
  }, time);
}

// Publish multiple messages
publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
