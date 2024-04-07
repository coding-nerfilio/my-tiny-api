# my-tiny-api

**my-tiny-api** is a Node.js package designed to scaffold a Express CRUD API REST for TypeORM entities with validation. Additionally, it automates the generation of a Postman collection for each endpoint, providing a seamless development experience for building APIs quickly and efficiently.

## Features

- Scaffold a CRUD API REST for TypeORM entities effortlessly (Create, Delete, Update, Get by id, Paginated Get).
- Automatically generate a Postman collection for each endpoint.
- Simplify API development and testing workflow.

## Installation

You can install **my-tiny-api** via npm:

```bash
npm install my-tiny-api
```

## Usage

To use **my-tiny-api**, follow these steps:

1. Install **my-tiny-api** as a development dependency in your Node.js project.
2. Create your TypeORM entities.
3. Import **my-tiny-api** into your project and initialize it

```bash

  app.use(
    MyTinyAPI({
      connection, //DataSource Typeorm
      entities: ["Posts","Comments"], //Typeorm entities
      config: {
        host: "localhost",
        port: 3000,
        basePath: "/api/",
        apiName: "BlogApi"
      },
    })
  );

```

4. Enjoy your scaffolded CRUD API REST and the automatically generated Postman collection!

![alt text](https://github.com/coding-nerfilio/my-tiny-api/blob/main/image.png?raw=true)

## Roadmap

Some functionality to add in the future:

- Authentication
- Customization for each endpoint

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This package is licensed under the MIT License.
