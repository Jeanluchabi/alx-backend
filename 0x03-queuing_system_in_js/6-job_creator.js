import { createQueue } from 'kue';
import { createClient } from 'redis';


// Creating queue with kue
const queue = createQueue();

// Creating object of Redis client
const client = createClient();

// On connect
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Create a job and add it to the queue
const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, world!'
};

const job = queue.create('push_notification_code', jobData).save((err) => {
  if (!err) {
    console.log('Notification job created:', job.id);
  }
});

// Listen for job completion
job.on('complete', () => {
  console.log('Notification job completed');
});

// Listen for job failure
job.on('failed', () => {
  console.log('Notification job failed');
});
