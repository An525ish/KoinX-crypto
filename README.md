# Crypto Stats API

A Node.js API for fetching and analyzing cryptocurrency data.

## Features

- Fetch current price, market cap, and 24-hour change for Bitcoin, Matic, and Ethereum
- Store cryptocurrency data in MongoDB
- Provide latest stats for a specific cryptocurrency
- Calculate standard deviation of price for the last 100 records

## Prerequisites

- Node.js (v14+)
- MongoDB

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/crypto-stats-api.git
   cd crypto-stats-api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/crypto_stats
   JOB_INTERVAL=0 */2 * * *
   ```

## Usage

1. Start the development server:

   ```
   npm run dev
   ```

2. Build for production:

   ```
   npm run build
   ```

3. Start the production server:
   ```
   npm start
   ```

## API Endpoints

- `GET /api/stats?coin=<coin_name>`: Get latest stats for a specific cryptocurrency
- `GET /api/deviation?coin=<coin_name>`: Get standard deviation of price for the last 100 records

## Linting

Lint the code using:

```
npm run lint
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
