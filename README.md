# Server is on

## Story

It's not always so easy in Codecool to follow the students status.
We can lose in the hundreds of names and statuses, so CC ask students to help with the management.
You have to create an API that manage the json files where the students data is in and make endpoints for output.

## What are you going to learn?

- Node.js
- Express.js
- Server routing
- Working with files

## Tasks

1. For testing you just create the API beta locally. Create a server using Express.js and Node.js. That will be an API for the purpose of data fetching.
    - When we launch the server, the root endpoint ("/") returns an HTML with a `<h1>Hello World! It's Codecool</h1>` tag

2. We need an endpoint to return all the students
    - When we send a get request to the endpoint `api/students`, it returns a JSON with a bunch of student object
    - When we send a get request to the endpoint `api/students/1`, it returns a JSON with the student with the `id` 1

3. We need endpoint for the different statuses. If the status is true, the student is an active student, if false, the student has already finished a course.
    - When we sen a get request to the endpoint `api/status/active`, it returns a JSON with the students with the `status` true
    - When we send a get request to the enpoint `api/status/finished`, it returns a JSON with the students with the `status` false

4. [OPTIONAL] The API is easily maintainable if we can add new students to the file. Create an endpoint where we can add students to the end of the file.
    - When we send a post request to the endpoint `api/students` with an object with `name` property, the API writes the name in the file with the status true

## General requirements

None

## Hints

- For the file reading, don't use the `require()` built-in function. Require is synchronous function and is called only once, which means the calls receive a cached result. If the file is updated you can't re-read it using this method.

## Background materials

- <i class="far fa-exclamation"></i> [Getting started](https://expressjs.com/en/starter/hello-world.html)
- <i class="far fa-exclamation"></i> [Endpoints](https://expressjs.com/en/starter/basic-routing.html)
- <i class="far fa-book-open"></i> [FAQ](https://expressjs.com/en/starter/faq.html)
- <i class="far fa-book-open"></i> [RESTful API overview](https://searchapparchitecture.techtarget.com/definition/RESTful-API)
- <i class="far fa-exclamation"></i> <i class="far fa-video"></i> [REST API through examples](https://www.youtube.com/watch?v=7YcW25PHnAA)
- <i class="far fa-book-open"></i> [Ports](https://flaviocopes.com/ports/)
