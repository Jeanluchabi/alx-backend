import { createQueue } from 'kue';

const queue = createQueue();

const blacklistedNumbers = [4153518780, 4153518781];

// Function to send notification
function sendNotification(phoneNumber, message, job, done) {
  // Check if phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    const error = new Error(`Phone number ${phoneNumber} is blacklisted`);
    return done(error);
  }

  // Simulating job progress
  job.progress(50);

  // Sending notification
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Simulating job completion
  setTimeout(() => {
    job.progress(100);
    done();
  }, 1000);
}

// Process jobs
queue.process('push_notification_code_2', 2, (job, done) => {
  // Get job data
  const { phoneNumber, message } = job.data;

  // Send notification
  job.progress(0);

  sendNotification(phoneNumber, message, job, done);
});

// Example jobs
queue.create('push_notification_code_2', {
  phoneNumber: 4153518743,
  message: 'This is the code 4321 to verify your account',
}).save();

queue.create('push_notification_code_2', {
  phoneNumber: 4153538781,
  message: 'This is the code 4562 to verify your account',
}).save();

queue.create('push_notification_code_2', {
  phoneNumber: 4153118782,
  message: 'This is the code 4321 to verify your account',
}).save();

queue.create('push_notification_code_2', {
  phoneNumber: 4153718781,
  message: 'This is the code 4562 to verify your account',
}).save();

queue.create('push_notification_code_2', {
  phoneNumber: 4159518782,
  message: 'This is the code 4321 to verify your account',
}).save();

queue.create('push_notification_code_2', {
  phoneNumber: 4158718781,
  message: 'This is the code 4562 to verify your account',
}).save();

queue.create('push_notification_code_2', {
  phoneNumber: 4153818782,
  message: 'This is the code 4321 to verify your account',
}).save();

queue.create('push_notification_code_2', {
  phoneNumber: 4154318781,
  message: 'This is the code 4562 to verify your account',
}).save();

queue.create('push_notification_code_2', {
  phoneNumber: 4151218782,
  message: 'This is the code 4321 to verify your account',
}).save();
