# NodeJS VZ-Voucher-Gift

## Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 18.17.0
- Install Redis
- Install MySQL
- Install Xampp

## Installation
1. Redis
- Install Redis at: https://redis.io/docs/install/install-redis/
- Run Redis on local machine

2. MySQL
- Install MySQL at: https://dev.mysql.com/downloads/installer/  (Download `mysql-installer-community-8.0.36.0.msi`)

3. Xampp
- Install Xampp at: https://www.apachefriends.org/
- Run Xampp as Administrator
- Run MySQL in Xampp
> [!NOTE]
> Must stop MySQL80 Service on local machine

## Configuration
1. Environment variables
- Create `.env` file
- Copy content in `.env.example` file into `.env` file
- Add environment variable

| Variable Name  | Description |
| ------------- | ------------- |
| PORT  | The port that NodeJS Application runs on  |
| NODE_ENV  | The environment that NodeJS Application runs on  |
| EMAIL_APP  | Email address that is used for sending email  |
| EMAIL_APP_PASSWORD  | Email password (App password), for example: https://support.google.com/mail/answer/185833?hl=en  |
| AWS_ACCESS_KEY_ID  | [Not required] |
| AWS_SECRET_ACCESS_KEY  | [Not required] |
| AWS_DEFAULT_REGION  | AWS region  |
| COGNITO_USER_POOL_ID  | AWS Cognito User pool ID  |
| REQUEST_KEY  | API key |
| LINK_API  | API query Order Status from IPay |
| MID  | Merchant ID |
| SECRET_KEY  | Secret key |
| LOGIN_ID  | Login ID |
| PASSWORD  | Password |

2. Initialize database and Sequelize
- In xampp control, after run MySQL successfully, click Admin button at MySQL module
- Create new database, set name is 'thaivietjet promotion'. If you set a different name, you must edit the configuration in the `config.json` and `connectDB.js` files.
- Open the terminal in the IDE, and then run this command to create all tables in the database (for more detail: https://sequelize.org/docs/v7/cli/).
 ```sh
   npx sequelize-cli db:migrate
   ```

## Running the application
1. Clone the repository:
2. Navigate to the project directory
 ```sh
   cd VZ-NodeJs-ThaiVietjet-Promotion
   ```
3. Install dependencies:
 ```sh
   npm install
   ```
4. Running the project:
 ```sh
   npm start
   ```