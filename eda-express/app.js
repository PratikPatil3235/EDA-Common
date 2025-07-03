const EventEmitter = require("events");

const myEmitter = new EventEmitter();
// Event Listener
myEmitter.on("greet", (name) => {
  console.log(`Hello ${name}`);
});

// Event Emitter
myEmitter.emit("greet", "Alice");

myEmitter.on("bye", (name1, name2) => {
  console.log("Bye Bye....",name1,name2);
});

setTimeout(() => {
  myEmitter.emit("bye", "Pratik", "Rahul");
}, 5000);
