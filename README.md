# sse-mock

## Prerequisites

1. [Node.js LTS](https://github.com/nodejs/Release)

   - [Automatically call nvm use](https://github.com/nvm-sh/nvm#deeper-shell-integration)

## Get Started

```
npm install ssr-mock
```

### add the package in webpack's plugins

#### sse

```
import WebpackSsePlugin from 'sse-mock';

...

const webpackSsePlugin = new WebpackSsePlugin({
    port: 8844, // sse server port
    time: 4000, // mock rotation interval
    data: 'hhh', // mock data
});

```

#### ssr

```

const webpackSsePlugin = new WebpackWsPlugin({
    port: 8088,
    time: 4000,
    data: ['xxxx', 'yyyy', 'zzzz'],
});

```
