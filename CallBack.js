/*
NEW TOPIC: CALLBACK FUNCTIONS

A callback function is a function that is passed as an argument to another function.
The process allows one function to call another function hence the function that is called back will run alongside the caller.

- JS functions run in the order that they are called not in the order that they are declared.
Eg:
*/

function greet1() {
  console.log("Good morning!");
}

function greet2() {
  console.log("Good Afternoon!");
}
function greet3() {
  console.log("Good Evening!");
}

greet3();
greet2();
greet1();

/*
The above gave:

Good Evening!
Good Afternoon!
Good morning!

Because of the order of calling.

If we also have three functions where the two last are calling the first, if the third one is called first then the value it produces by calling the first one wioll be the first result we will get.

*/

function mySalute(name) {
  console.log("Good morning", name);
  let greet = "Good morning" + " " + name;
  document.getElementById("para1").innerHTML = greet;
}

function greetGreen() {
  mySalute("Green");
}
function greetAisha() {
  mySalute("Aisha");
}

greetAisha();
greetGreen();
/*
Result:
Good morning Aisha
Good morning Green

Note that if greetGreen and greetAisha were targeting same node for an output, the GreetAisha will first happen before GreetGreen. So we will have "Good morning Green" at the end of this page load
*/

/*

NEW TOPIC; SEQUENCE CONTROL;
We might want to better take control of when to execute functions. For examp0le we might want to do a calculation and hold the result and then print it when we want by using another funct. There are two ways we can do this, viz:
*/

//Define the calculator function
function myCalc(a, b) {
  sum = a + b;
  return sum;
}

//Define my displayer that does the output
function myDisplay(job) {
  console.log(job);
}
//use a variable to hold a calculation done by our calculator app and then use my display function to output what is in the variable
let calculation = myCalc(2, 39);
myDisplay(calculation); // 41

//OR ; Define the calculator function and then let the display function call the calculator and produce result

function myDisplayer2(param) {
  console.log(param);
}

function myCalclType2(num1, num2) {
  let sum = num1 + num2;
  myDisplayer2(sum);
}

myCalclType2(2, 39); //41

// The first option needs calling two functions to be able to get the rsult.
// The second option, you cannot stop the display of the result if you wanted to.
// Here comes in callback functions

// A callback function is one that is passed as an argument to another function. So to achieve that 41 we aimed at we can pass the two numbers(params/arguments) together with the callback and the callback will be called when the primary function of the containing function is done.

function myDisplayer3(param) {
  console.log(param);
}

//Now we can invoke the above function or any other as a callback function when we call the below function

function myMainFunc(num1, num2, myCallBackFunc) {
  let mysum = num1 + num2;
  myCallBackFunc(mysum);
}

myMainFunc(2, 39, myDisplayer3);

/*Always remember not to use parenthesis when you pass a function as an argument:
myMainFunc(2,39,myDisplayer3) - correct
myMainFunc(2,39,myDisplayer3()) - wrong

*/

// NEW TOPIC:  ASYNCHRONOUS JAVASCRIPT

// Asynchronous functions are functions that run in parallel with other function. This is were callback functions really sgine out. Example is in javascript timeout. You can pass another function into the timeout function tro be executed when the time runs out.

function whattoDo() {
  document.getElementById("para2").innerText = "The land is actually Green";
}
setTimeout(whattoDo, 5000);
//  In this example above, we call whattoDo as a callback in the timeout which executes the code after 5 seconds.

/* We can also pass a whole function as an argument instead of dirst defining the functiuon and then passing the name as we did above */

setTimeout(function shoutOut() {
  document.getElementById("para3").innerText = "Hello Paragraph 3!";
}, 6000);

/*
We can also use setInterval to do a callback function
*/

function timerFunction() {
  let d = new Date();
  document.getElementById("clock").innerHTML =
    d.getHours() + " :" + d.getMinutes() + " :" + d.getSeconds();
}

setInterval(timerFunction, 1000);

// Another example of where calback functions shine is when you write a function that loads an external data like a file or script, you cannot use the data before it is fully loaded. This calls for using callback function.

// Think about streaming music or movie or displaying an image or other data onclick without reloading the page. This can be seen done below:

//This is just a function that we call alongside our main function. This is optional. It will change the background color to black and text color to white
function myFunction() {
  document.getElementsByTagName("BODY")[0].style.backgroundColor = "black";
  document.getElementsByTagName("body")[0].style.color = "white";
}

//This is going to be our callback function that will be called inside our main function (getPage) to use in sending data to the frontend
function displayToPage(something) {
  document.getElementsByClassName("displayExtPage")[0].innerHTML = something;
}

//Our main function here is defined and it will use HMLHttp request to grab a html page. Notice that "myCallBack" is a parameter to it, when we call getPage, 'displayToPage' will be it's callback function to send the result of the request to the user
function getPage(myCallBack) {
  let req = new XMLHttpRequest();
  req.open("GET", "imagepage.html");
  req.onload = function () {
    if (req.status == 200) {
      myCallBack(this.responseText);
    } else {
      myCallBack("Error: " + req.status);
    }
  };
  req.send();
}

//Using a button click to call getpage and myFunction - that is two functions in one button click
document.getElementById("fetch").addEventListener("click", () => {
  getPage(displayToPage);
  myFunction();
});

// NEW TOPIC: JAVASCRIPT PROMISES
/*
There are two important concepts to understand in this topic:
1- Producing code: This is a code that can take some time to get result
- Consuming code: This must wait for thr result of the producing code before it acts.

Javascript promise object contains the producing code and also calls the Consuming code.


//Promise syntax:

//Prodducing code:
 let myPromise= new Promise(function(myResolve, myReject){
  myResolve();
  myReject()
 })

 //consuming code:

 myPromise.then(
  function(value){
    //What to do if successful
  },
  function(error){
    //Code to run if error occured
  }
 )

 //The producing code will call one of the two callback functions. If successful, call myResolve, if error, call myReject

 //PTOMISE OBJECT PROPERTIES:

 JS promise object can be:
 - Pending,
 - fulfilled
 - Rejected.


 The promise object also supports two properties:
 - state (myPromise.state)
 - result (myPromise.result)

 - While the promise object is working, it is said to have a "pending" state, the result is undefined.
 - When the promise object is "fulfilled", ie successfuly finished we get a result value
 - When rejected, error object is the result

 You cannot access the properties of promise - state and result and you must use a promise method to handle promises

 //NEW TOPIC: HOW TO USE PROMISE


 myPromise.then(
  function(value){//code to run if successful},
  function(error){//code to run if unsuccessful}
 )

 //Promise.then() - It takes two args, one for success and one for failure but only one can be used if you like

 //Example:

*/

function theProjector(arg) {
  document.getElementsByClassName("para4")[0].innerHTML = arg;
}

let firstPromise = new Promise(function (myResolve, myReject) {
  let c = 2;
  //The producing code
  if (c < 1) {
    myResolve("Great!");
  } else {
    myReject("Oops! Error!");
  }
});

firstPromise.then(
  function (value) {
    theProjector(value);
  },
  function (error) {
    theProjector(error);
  }
);

// Use promises when you have a code that may take a while to load something and there is probability that it may or may not produce the required result. If it does, it will do what you want afterwards, if not, it will give you an update or error feedback

//NEW TOPIC: CALL BACK HELL: This is when callback functions are nested to the extent that they become hard to read, understand or maintain. eg, nexting of setTimouts when we want them to be chained together. In the example below, we want the timeOuts to be linked, so that 2nd timeout waits for the first and so on. In this case we do not want to just hardcode the timing to suite what we want, rather, we'll chain them like so:

let para5 = document.getElementsByClassName("para5")[0];
let para6 = document.getElementsByClassName("para6")[0];
let para7 = document.getElementsByClassName("para7")[0];

setTimeout(() => {
  para5.innerHTML = "I love you!";
  setTimeout(() => {
    para6.innerHTML = "I love Jane!";
    setTimeout(() => {
      para7.innerHTML = "I love Jesus!";
    }, 5000);
  }, 3000);
}, 1000);

//This kind of code can become way more complex and it will become more complicated to handle and track what is going on. This is why we need promises and async-await

// A promise is an object that returns a value that you hope to use in the future but not right away. It is like Booking a flight online and getting a ticket. The ticket is an assurance or promise that you will be booking the flight. If everything goes fine, then you will get on the flight, but if something bad happens, then you willl get an error, maybe a refund or a delay. A restaurant analogy also works.

// In the above case, there are three stages or cases: Pending, Fullfiled, Rejected.
// A very common use of promise is http request as we have seen previously. You setup the request from yours or other servers and it might take a while for there to be a response, so you can simply set other things that will happen if the request was successful or failed/rejected and you code does nopt need to wait for the request ot be fulfilled before other parts of your application or website will load. This is the benefit of asynchronous js.

//Promises are created with a constructor writen: new Promise((function1AsParameter,function1AsParameter ){})
// We normally use resolve and reject as the parameter names in the promises. Note that reject and resolve are functions.
//Promises have three states: Pending, Fulfilled and Rejected. Once it goes from pending to rejected or fulfilled, it cannot go back. It is a one way street.
//Promises initially starts are pending 9waiting for a result), then it could become fulfilled or rejected

/*
const promise = new Promise((resolve, reject) => {});
console.log(promise);
//this will give you an object that contains the present state that the app is in. In this case "Pending" since it is still in peninf state

[[Prototype]]
:
Promise
[[PromiseState]]
:
"pending"
[[PromiseResult]]
:
undefined
*/

/*
You can pass resolve in without any data. If you log this to the console now, you will see that the promise is fulfiled but the value is undefined:

const promise = new Promise((resolve, reject) => {
  resolve();
});
console.log(promise);

// Promise {<fulfilled>: undefined}



const promise = new Promise((resolve, reject) => {
  resolve("Hello Promise!");
});
console.log(promise);

//Promise {<fulfilled>: 'Hello Promise!'}. Now the promise state is fulfiled , has a result.



//Promise with rejection but no rejection reason or value;

const promise2 = new Promise((resolve, reject) => {
  reject();
});
console.log(promise2);
//Promise {<rejected>: 'undefined'}

//Promise with rejection reason or value:
const promise = new Promise((resolve, reject) => {
  reject("There was some error");
});
console.log(promise);
//Promise {<rejected>: 'There was some error'}
*/
/*
Note that the state and value of the promise cannot be accessed directly, so we cannot just do this for example:

console.log(promise.value);

It will give us undefined.

So we have to use another method that is .then() to get resolved data and .catch() to get error (that is reject). So continuing, we'll do
*/

//Let us now mmake a promise that has resolve and reject vvalues and try to access them via .then() and .catch

let promise = new Promise((resolve, reject) => {
  resolve("Some data was received");
  reject("No data wa received");
});
//Accessing the data:
// promise.then((someData) => console.log(someData));
// promise.catch((someError) => console.log(someError));

//The above resultants can also be written as:

promise
  .then((someData) => console.log(someData))
  .catch((someError) => console.log(someError));

//Now by default, what we will see produced in the console will be our resolve message because there is a resolve. But if we comment out or create a conditional that makes it impossible for resolve to be returned, then our error (reject message) will be produced.

// Remember that what happens with rejection or resolution may be anything like calling a whole new function, creating an alert etc. It must not always be console log. Example, you ping a site to scrape something from it. If the response was 200, then you produce the result of your scraping, if it was 403 etc, then you get your predefined error message or you ping another site etc.

//Let us validate a number entered by a user on the fronend when they press a button

const phoneInput = document.getElementById("phone");
const validate = document.getElementById("validateNumber");

validate.addEventListener("click", inPutValidator);

function inPutValidator() {
  const callPromise = new Promise((rejoice, reject) => {
    let phone = Number(phoneInput.value);
    const realNumberCheck = phone - 1;
    if (phone.toString().length == 10 && isNaN(realNumberCheck) == false) {
      rejoice(
        "A valid phone number has been entered, we have send you a message to verify"
      );
    } else {
      reject(
        "you may have entered an invalid character or number less than 11 digits. Please correct and try again"
      );
    }
  });
  callPromise
    .then((data) => {
      alert(data);
    })
    .catch((error) => {
      alert(error);
    });
}

/*
Here is another example of Promises:
This time we are going to replicate to get the result we got with the example in callback hell but to ttry to avoid the trouble associated with callback hell. We have 3 paragraphs on the html with IDs hel1 - hel3. We want the colors and text sizes of the texts contained in these paragraphs to changes on specific timeouts but we want these to happen in sequences. The first will happen, then the timer for the second will follow and then the last timer will follow.
All will start after the "Click me" button is clicked.
*/

let butt = document.getElementById("butt");

//The function that will be called when button is clicked. It will contain the promise initiation while tyhe button adeventlistener will contain the remaining part
function addColor(time, selector, newColor, newSize) {
  //Create a dynamic element selector that take in an argument
  const selected = document.getElementById(selector);
  return new Promise((resolve, reject) => {
    if (selected) {
      setTimeout(() => {
        selected.setAttribute(
          "style",
          `color: ${newColor};  background-color: lightgray; font-weight:bold; font-size: ${newSize}px`
        );
        resolve();
      }, time);
    } else {
      reject("Sorry no valid selection was made!");
    }
  });
}

butt.addEventListener("click", () => {
  addColor(2000, "hel1", "red", 20)
    .then(() => {
      addColor(2000, "hel2", "green", 25);
    })
    .then(() => {
      addColor(2000, "hel3", "orange", 30);
    })
    .catch((error) => {
      console.log(error);
    });
});

//NEW TOPIC: ASYNC AWAIT:
//Allows us to write asynchronous javascript without endlessly writing callbacks.
//Await will always wait until the promise is settled but await only can be used if async is written iin front of the function.
//Async function always returns a promise
