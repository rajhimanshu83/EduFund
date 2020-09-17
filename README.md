# Stock/ETFs Histories React Application

![Demo Image](https://res.cloudinary.com/techcop/image/upload/v1600334385/Screenshot_50_67eea6681d.png)

# Application Stack

React
MongoDB
Node
Express

## API EntryPoint

* dev  http://localhost:8000/ 


## UI Pages
Homepage
Login
Register

## To run Project locally
npm i 
cd client 
npm i
cd ..

Run the project --> npm run dev


### API Endpoints

```
Stock History 
method:get '/api/dailydata/${ticker}/${time}'  Headers- Authorization 'Bearer ${token}'

Stock Info
method:get '/api/info/${ticker}'

User SignIn
method:post '/api/signin' body: { email, password }

User Registration
method:post '/api/register' body: { username, email, password }


```
### Database Schema

## Stock Histories schema
```
    date: {
    type: Date,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  open: {
    type: Number,
    required: true
  },
  close: {
    type: Number,
    required: true
  },
  high: {
    type: Number,
    required: true
  },
  low: {
    type: Number,
    required: true
  },
  adjustedClosePrice: {
    type: Number,
    required: true
  },
  symbol: {
    type: String,
    required: true
  }

```

## Stock Info schema
```
    companyname: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  }

```

## User schema
```
username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }

```