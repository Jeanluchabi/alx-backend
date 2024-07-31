const assert = require('assert');
const kue = require('kue');
const createPushNotificationsJobs = require('../createPushNotificationsJobs');

describe('createPushNotificationsJobs', () => {
  let queue;

  before(() => {
    // Create a new Kue queue
    queue = kue.createQueue();
    // Enter test mode without processing the jobs
    queue.testMode.enter();
  });

  after(() => {
    // Clear the queue and exit test mode
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should display an error message if jobs is not an array', () => {
    // Call the function with an invalid argument
    createPushNotificationsJobs('not an array', queue);

    // Assert that the error message is displayed
    assert.strictEqual(queue.testMode.jobs.length, 1);
    assert.strictEqual(queue.testMode.jobs[0].type, 'push_notification_code');
    assert.strictEqual(queue.testMode.jobs[0].data, 'Jobs is not an array');
  });

  it('should create two new jobs to the queue', () => {
    // Call the function with valid arguments
    createPushNotificationsJobs(['job1', 'job2'], queue);

    // Assert that two jobs are created
    assert.strictEqual(queue.testMode.jobs.length, 2);
    assert.strictEqual(queue.testMode.jobs[0].type, 'push_notification_code');
    assert.strictEqual(queue.testMode.jobs[0].data, 'job1');
    assert.strictEqual(queue.testMode.jobs[1].type, 'push_notification_code');
    assert.strictEqual(queue.testMode.jobs[1].data, 'job2');
  });

  // Add more test cases as needed
});
