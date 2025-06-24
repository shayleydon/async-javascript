// 1. Your original promise that runs custom logic
let MyPromiseRace = new Promise(function(resolve){
    setTimeout(function() { 
        resolve('MyPromiseRace has been fulfilled in 1 second! But the timeout is set to 500ms, you will never see this :3'); 
    }, 1000);
});

// 2. The timeout promise that will impose as limit 500 milliseconds
let timeout = new Promise(function(resolve, reject){
    setTimeout(function() { 
        reject('Time out! Your MyPromiseRace couldnt be fulfilled in half second :c'); 
    }, 500);
});

// 3. Race both promises, if MyPromiseRace isn't fulfilled in 500 milliseconds, the second promise will be executed and rejected.
// It will output: Time out! Your promise couldn't be fulfilled in half second :c
Promise.race([MyPromiseRace, timeout]).then(function(data){
    console.log(data);
}).catch(function(e){
    console.log(e);
});

/**
 * The timeoutPromise helper allows you to wrap any promise to fulfill within a timeout.
 * 
 * @param {Promise} promise A promise instance
 * @param {BigInteger} timeoutInMilliseconds The time limit in milliseconds to fulfill or reject the promise.
 * @returns {Promise} A pending Promise
 */
Promise.timeout = function(promise, timeoutInMilliseconds){
    return Promise.race([
        promise, 
        new Promise(function(resolve, reject){
            setTimeout(function() {
                reject("timeout");
            }, timeoutInMilliseconds);
        })
    ]);
};

// 1. Store your promise in a variable for readability
let MyPromiseThen = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve("MyPromiseThen Success!");
    }, 4000);
});

// 2. Provide your promise as first argument of the helper function
// and provide as second parameters the time limit for this promise to be fulfilled
// in milliseconds (e.g. 3000 = 3 seconds)
Promise.timeout(MyPromiseThen, 3000).then(function(result){
    // My promise fulfilled in less than 3 seconds
    // If fulfilled, it should output: success!
    console.log(result);
}).catch(function(err){

    // 3. In this example, the timeout will be triggered as there's a limit of 3 seconds to run
    // a promise that will be fulfilled in 4 seconds.
    if(err == "timeout"){
        console.log("MyPromiseThen couldn't be fulfilled in less than 3 seconds :c");
        return;
    }

    // Handle reject logic of your original promise if any
});

// 1. Store your promise in a variable for readability
let MyPromiseAwait = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve("MyPromiseAwait Success!");
    }, 4000);
});

// 2. An example of how to use the timeout with some code that uses await and async
async function runLogic(){    
    try{
        const result = await Promise.timeout(MyPromiseAwait, 3000);

        // If fulfilled, outputs: Success!
        console.log(result);
    }catch(e){
        if(e == "timeout"){
            console.log("MyPromiseAwait couldn't be fulfilled in less than 3 seconds :c");
        }
    }
}

runLogic();
