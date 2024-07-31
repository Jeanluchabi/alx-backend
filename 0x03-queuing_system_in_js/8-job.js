// Push notifications
export default function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Iterate over each job in the jobs array
  jobs.forEach((job) => {
    // Create a push notification job with a specific type ('push_notification_code_3') and data (job)
    const notificationJob = queue.create('push_notification_code_3', job)
      // Save the job to the queue and handle any errors
      .save((err) => {
        if (err) {
          console.log(`Notification job ${notificationJob.id} failed: ${err}`);
        } else {
          console.log(`Notification job created: ${notificationJob.id}`);
        }
      });

    // Listen for the 'complete' event when the job is finished
    notificationJob.on('complete', () => {
      console.log(`Notification job ${notificationJob.id} completed`);
    });

    // Listen for the 'failed' event when the job encounters an error
    notificationJob.on('failed', (err) => {
      console.log(`Notification job ${notificationJob.id} failed: ${err}`);
    });

    // Listen for the 'progress' event to track the job's progress
    notificationJob.on('progress', (progress) => {
      console.log(`Notification job ${notificationJob.id} ${progress}% complete`);
    });
  });
}

//export default createPushNotificationsJobs;
//export default createPushNotificationsJobs;
