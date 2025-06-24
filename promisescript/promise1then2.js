let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise 1 resolved")
    },1000)})

let myPromise2 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise 2 resolved")
    },6000)})

  myPromise1.then((successMessage) => {
    console.log("From Callback " + successMessage)
    myPromise2.then((successMessage) => {
      console.log("From Callback " + successMessage)
    })
  })
