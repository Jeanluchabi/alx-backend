
This a project on 0x03-queuing_system_in_js

### Resources
Read or watch:

- Redis quick start
- Redis client interface
- Redis client for Node JS
- Kue deprecated but still used in the industry

### Learning Objectives
At the end of this project, you are expected to be able to explain to anyone, without the help of Google:

- How to run a Redis server on your machine
- How to run simple operations with the Redis client
- How to use a Redis client with Node JS for basic operations
- How to store hash values in Redis
- How to deal with async operations with Redis
- How to use Kue as a queue system
- How to build a basic Express app interacting with a Redis server
- How to build a basic Express app interacting with a Redis server and queue

### Requirements
- All of your code will be compiled/interpreted on Ubuntu 18.04, Node 12.x, and Redis 5.0.7
- All of your files should end with a new line
- A README.md file, at the root of the folder of the project, is mandatory
- Your code should use the js extension

### Required Files for the Project
- package.json
- .babelrc

### Tasks
#### 0. Install a redis instance
- Download, extract, and compile the latest stable Redis version (higher than 5.0.7 - https://redis.io/downloads/)
- Start Redis in the background with `src/redis-server`
- Make sure that the server is working with a `ping src/redis-cli ping`
- Using the Redis client again, set the value School for the key Holberton
- Kill the server with the process id of the redis-server (hint: use ps and grep)
- Copy the dump.rdb from the redis-5.0.7 directory into the root of the Queuing project.

#### 1. Node Redis Client
- Install node_redis using npm
- Write a script named 0-redis_client.js. It should connect to the Redis server running on your machine.

#### 2. Node Redis client and basic operations
- In a file 1-redis_op.js, copy the code you previously wrote (0-redis_client.js).
- Add two functions: setNewSchool and displaySchoolValue.

#### 3. Node Redis client and async operations
- In a file 2-redis_op_async.js, copy the code from the previous exercise (1-redis_op.js).
- Modify the function displaySchoolValue to use ES6 async/await.

#### 4. Node Redis client and advanced operations
- In a file named 4-redis_advanced_op.js, store a hash value using the Redis client.

#### 5. Node Redis client publisher and subscriber
- In a file named 5-subscriber.js, create a Redis client that subscribes to a channel and logs received messages.
- In a file named 5-publisher.js, create a Redis client that publishes messages to a channel.

#### 6. Create the Job creator
- In a file named 6-job_creator.js, create a queue with Kue and create a job with job data.

#### 7. Create the Job processor
- In a file named 6-job_processor.js, create a queue with Kue and process jobs.

#### 8. Track progress and errors with Kue: Create the Job creator
- In a file named 7-job_creator.js, create jobs with Kue and track their progress and errors.

#### 9. Track progress and errors with Kue: Create the Job processor
- In a file named 7-job_processor.js, process jobs with Kue and track their progress and errors.

#### 10. Writing the job creation function
- In a file named 8-job.js, create a function named createPushNotificationsJobs that creates jobs in a queue.

#### 11. Writing the test for job creation
- Write tests for the createPushNotificationsJobs function.


#### 12. In stock?

Create an array `listProducts` containing the list of the following products:

- Id: 1, name: Suitcase 250, price: 50, stock: 4
- Id: 2, name: Suitcase 450, price: 100, stock: 10
- Id: 3, name: Suitcase 650, price: 350, stock: 2
- Id: 4, name: Suitcase 1050, price: 550, stock: 5

Create a function named `getItemById`:

- It will take `id` as an argument
- It will return the item from `listProducts` with the same `id`

Create an express server listening on the port 1245. (You will start it via: `npm run dev 9-stock.js`)

Create the route `GET /list_products` that will return the list of every available product with the following JSON format:

```json
[
    {
        "id": 1,
        "name": "Suitcase 250",
        "price": 50,
        "stock": 4
    },
    {
        "id": 2,
        "name": "Suitcase 450",
        "price": 100,
        "stock": 10
    },
    {
        "id": 3,
        "name": "Suitcase 650",
        "price": 350,
        "stock": 2
    },
    {
        "id": 4,
        "name": "Suitcase 1050",
        "price": 550,
        "stock": 5
    }
]
```

Create a client to connect to the Redis server:

Write a function `reserveStockById` that will take `itemId` and `stock` as arguments:

- It will set in Redis the stock for the key `item.ITEM_ID`

Write an async function `getCurrentReservedStockById`, that will take `itemId` as an argument:

- It will return the reserved stock for a specific item

Create the route `GET /list_products/:itemId`, that will return the current product and the current available stock (by using `getCurrentReservedStockById`) with the following JSON format:

```json
{
    "product": {
        "id": 1,
        "name": "Suitcase 250",
        "price": 50,
        "stock": 4
    },
    "available_stock": 4
}
```

If the item does not exist, it should return:

```json
{
    "error": "Item not found"
}
```

Create the route `GET /reserve_product/:itemId`:

If the item does not exist, it should return:

```json
{
    "error": "Item not found"
}
```

If the item exists, it should check that there is at least one stock available. If not, it should return:

```json
{
    "error": "Out of stock"
}
```

If there is enough stock available, it should reserve one item (by using `reserveStockById`), and return:

```json
{
    "message": "Item reserved"
}
```
## Advanced

#### 13. Can I have a seat?

Create a Redis client:

Create a function `reserveSeat`, that will take the number of seats as an argument, and set the key `available_seats` with the number

Create a function `getCurrentAvailableSeats`, it will return the current number of available seats (by using promisify for Redis)

When launching the application, set the number of available seats to 50

Initialize the boolean `reservationEnabled` to true - it will be turned to false when no seat will be available

Create a Kue queue

Create an express server listening on the port 1245. (You will start it via: `npm run dev 100-seat.js`)

Add the route `GET /available_seats` that returns the number of available seats:

```json
{
    "available_seats": 50
}
```

Add the route `GET /reserve_seat` that:

Returns `{"status": "Reservation are blocked"}` if `reservationEnabled` is false

Creates and queues a job in the queue `reserve_seat`:
- Save the job and return `{"status": "Reservation in process"}` if no error
- Otherwise: `{"status": "Reservation failed"}`

When the job is completed, print in the console: `Seat reservation job JOB_ID completed`

When the job fails, print in the console: `Seat reservation job JOB_ID failed: ERROR_MESSAGE`

Add the route `GET /process` that:

Returns `{"status": "Queue processing"}` just after:
- Process the queue `reserve_seat` (async):
    - Decrease the number of available seats by using `getCurrentAvailableSeats` and `reserveSeat`
    - If the new number of available seats is equal to 0, set `reservationEnabled` to false
    - If the new number of available seats is more or equal than 0, the job is successful
    - Otherwise, fail the job with an Error with the message "Not enough seats available"

After executing the above route, the available seats will be decreased by 1 and the job completion message will be printed in the server terminal.

Example of reserving all seats:

The last 3 requests will return:

```json
{
    "status": "Reservation in process"
}
```

The available seats will be decreased to 49 and the job completion message will be printed in the server terminal.




## HappyCoding!
