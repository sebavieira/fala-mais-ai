import { Queue } from "bullmq";

const queue = new Queue("bootstrap", {
  connection: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },
});

void queue.getJobCounts().then((counts) => {
  console.log("worker connected", counts);
});
