const resolvedPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Resolved!");
  }, 2000);
});

resolvedPromise.then((message) => {
  console.log(message);
});

const rejectedPromise = new Promise((_, reject) => {
  setTimeout(() => {
    reject(new Error("Rejected!"));
  }, 2000);
});

rejectedPromise.catch((error) => {
  console.error("Something went wrong...", error.message);
});
