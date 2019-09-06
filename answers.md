#1. Mention two parts of Express that you learned about this week.

1. I learned that Express is a framework that sits on top of Node.js
2. I learned about Express' core features - middelware, routing, convenience helpers, etc.

#2. Describe Middleware?

- Middleware is an array of functions that are executed in the order they're introduced - I think of them as the "middle man" that can take in the request and response objects and either do nothing with them or alter them, then pass those objects along (or end the cycle depending on what you're trying to do). We can tell our code to go on to the next middelware function by calling next(). The custom middleware we can write in Express gives us the ability to perform certain tasks (like user and id validation from our previous project).

#3. Describe a Resource?

- Resources are the things our application cares about - the nouns in the application domain (hobbits, smurfs, users, products, orders etc.).

#4. What can the API return to help clients know if a request was successful?
The API can return status codes to tell the client the status of their request. A successful request will return a status code in the 200's.

#5. How can we partition our application into sub-applications?

- We can use Express Routing to turn our application into sub-applications.
  This makes it so we don't have to do everything on a single file and can split our application's structure up depending on the context (one file for userRouter, one for postRouter, etc.).
