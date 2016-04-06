How to run for develop
=============

`
	npm install
	npm run dev
`

How to run for product
=============
`
	npm install
	npm start
`


How to specify Host and Port for MongoDB
========================================
The app will make calls to the api server at the address specified under 'config/client-config.js'. Change the API_URL as needed.  

By default, the app will try to connect to mongodb at localhost:27017.  
To specify a different address, run:  
`npm start --db-address <hostIP>[:<port>]`

