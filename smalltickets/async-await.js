async function hello() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello, World!");
    }, 1000);
  });
}

async function writeMessage() {
  try {
    const message = await hello();
    console.log(message);
  } catch (error) {
    console.error("Something went wrong...", error.message);
  }
}

writeMessage();
