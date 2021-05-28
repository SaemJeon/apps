# apps

> A GitHub App built with [Probot](https://github.com/probot/probot) that test app

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t apps .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> apps
```

## Contributing

If you have suggestions for how apps could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2021 saemjeon <38971167+saemjeon@users.noreply.github.com>
