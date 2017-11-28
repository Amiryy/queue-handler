# QueueHandler
  A utility component for any JS app, put your fetch requests on a queue and prevent excessive network calls.
  
  **Perfect for live-search engines or any network calling handled with onChange.**
  
  ### About
  My QueueHandler is simply a class that `.add`s fetch requests to a queue, and handles your latest search query  
  without flooding your network with api calls.
  
  The behaviour of this queue is:
  
  1 - The first task that we add goes to the front of the queue.  
  2 - Once we add a second task to the queue, it goes in the second position.  
  3 - If we add a third task to the queue, it replaces the second.  
  
  There is a maximum of two tasks in the queue. As soon as the first task has ended, the second task is executed etc...  
  So you always end up with the latest result.
  
  **This QueueHandler overcomes the downsides of Debouncing and Throttling:**  
  [What is Debouncing and Throttling?](https://css-tricks.com/debouncing-throttling-explained-examples/)
  
  Lets say we wanna use debouncing or throttling to handle this function :
  ```
    function makeApiCall () {
      api.request({
      url: '/api/foo',
      method: 'get'
    }).then(response => {
      // assign response to data
    })
  }
  ```
  As you can see, the request uses an asynchronous process that will deal with the response data later.  
  Now say we have two requests, and we always want to use the result of the last request (That's what you want in a search input).  
  But the result of the second request comes before the result of the first request (this can happen because of low connection
  or many other reasons) and that will result in your data containing the wrong response:

    `1. 0ms -> makeApiCall() -> 100ms -> assigns response to data`
    `2. 10ms -> makeApiCall() -> 50ms -> assigns response to data`

## Getting Started
### Clone
  ```git clone https://github.com/Amiryy/QueueHandler.git```

## Usage
### Import
`import QueueHandler from '../utils/QueueHandler';`

### Define
`const queue = new QueueHandler();`

### Implement
Pass in the API route and the authorization token (usually necessary) to `queue.add()`.  
The queue returns a promise, use `.then` to resolve it, just like a regular `fetch`:
```
funtion handleSearch () {
    queue.add(API_URL, AUTHORIZATION_TOKEN).then(res => {
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res;
    }).then(res => res.json()).then(data => {
        handleResult(data);
    }).catch(error => {
        console.log(error);
    });
}
```
## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/Amiryy/5fd07e4c54f846ea578f906df4b7871e) for details on my code of conduct, and the process for submitting pull requests to me.


## Author

* **Amiry** - *Initial work* - [Amiryy](https://github.com/amiryy)

## Thanks
 - [El-Matella](https://stackoverflow.com/users/4547701/el-matella) - A kind Stack Overflow user who helped me with reaching this solution in my own use case.
