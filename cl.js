//define: n1 * n2 = r (5 * 4) = 20 = 5 + 5 + 5 + 5

function multiply(n1, n2){
  let result = 0;
  for(let i = 0; i < n2; i++){
    result += n1;
  }
  return result;
}

//define 5 * 4 = 20
let finalResult = multiply(5,4);
console.log(finalResult);

//define (5 * 4) * 4 = 80
finalResult = multiply(multiply(5,4), 4);
console.log(finalResult);

//define: n1 / n2 = r (20 / 4) = 5 = 20 -4 - 4 - 4 - 4 - 4

function divide(n1, n2){
  let result =1;
  while((n1 - n2) > 0){
    result ++;
    n1 -= n2;
  }
  return result;
}

//define: 20 /4 = 5
finalResult = divide(20,4);
console.log(finalResult);

//define (5*4) / 10 = 2
finalResult = divide(multiply(5,4),10);
console.log(finalResult);

//define ((5*4) / 10) * 6 = 12
finalResult = multiply(divide(multiply(5,4),10), 6);
console.log(finalResult);

// ES5 => Callback (función asíncrona que puede tener 2 estados aceptación y error).

function multiplyCall(success, error){
  try {
    let n1 = arguments[2];
    let n2 = arguments[3];
    if(n1 == null || n2 == null)
      throw("Missing parameters: expected 2 numbers after error.");
    let result =  multiply(n1, n2);
    success(result);
  }catch(e){
    error(e);
  }
}

function okCallBack(result){
  console.log(result);
}
function errorCallBack(error){
  console.log(`Error => ${error}`);
}

//define 5 * 4 = 20
console.log("+++++++ Multiply using callback ++++");
multiplyCall(okCallBack, errorCallBack, 5, 4);

multiplyCall(okCallBack, errorCallBack, 5);

//define (5 * 4) * 4 = 80


multiplyCall((result) =>{
  multiplyCall(okCallBack, errorCallBack, result, 4);
}, errorCallBack, 5, 4);

//define: n1 / n2 = r (20 / 4) = 5 = 20 -4 - 4 - 4 - 4 - 4

function divideCall(success, error){
   try {
    let n1 = arguments[2];
    let n2 = arguments[3];
     if(n1 == null || n2 == null)
      throw("Missing parameters: expected 2 numbers after error.");
      if(n2 == 0)
        throw("Divide over zero it's not possible.");
    let result = divide(n1, n2);
    success(result);
  }catch(e){
    error(e);
  }
}
console.log("+++++++ Divide using callback ++++");

//define: 20 /4 = 5
divideCall(okCallBack, errorCallBack, 20, 4);


//define (5*4) / 10 = 2
multiplyCall((result)=>{
  divideCall(okCallBack, errorCallBack, result, 10);
}, errorCallBack, 5, 4);


//define ((5*4) / 10) * 5 = 10

multiplyCall((result)=>{
  divideCall((result)=>{
    multiplyCall(okCallBack, errorCallBack, result, 5);
  }, errorCallBack, result, 10);
}, errorCallBack, 5, 4);

// Promises con ES6 => new Promise();
function multiplyPromise(result){
  return new Promise((resolve, reject)=>{
    if(result.n1 == null || result.n2 == null)
      throw("Missing parameters: expected 2 numbers.");
    let res = new Object();
    res.n1 = multiply(result.n1, result.n2);
    resolve(res);
  });
}

//define 5 * 4 = 20
let numbers = new Object();
numbers.n1 = 5;
numbers.n2 = 4;

multiplyPromise(numbers)
.then(okCallBack)
.catch(errorCallBack);

function dividePromise(result){
  return new Promise((resolve, reject)=> {
    if(result.n1 == null || result.n2 == null)
      throw("Missing parameters: expected 2 numbers.");
    if(result.n2 == 0)
      throw("Divide over zero it's not possible.");
    let res = new Object();
    res.n1 = divide(result.n1, result.n2);
    resolve(res);
  });
}

//define: 20 /4 = 5

numbers = new Object();
numbers.n1 = 20;
numbers.n2 = 4;

dividePromise(numbers)
.then(okCallBack)
.catch(errorCallBack);


//define ((5*4) / 10) * 5) = 10

numbers = new Object();
numbers.n1 = 5;
numbers.n2 = 4;

multiplyPromise(numbers)
.then((data)=>{
  data.n2 = 10;
  return dividePromise(data);
})
.then((data)=>{
  data.n2 = 5;
  return multiplyPromise(data);
})
.then(okCallBack)
.catch(errorCallBack);
