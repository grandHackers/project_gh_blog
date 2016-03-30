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
By default, the app will try to connect to mongodb at localhost:27017.  
To specify a different address, please run:  
`npm start --db-address <hostIP>[:<port>]`


Notes
=====
03/30/2016:
- So far nothing fancy, only one API action ("GET" for user) present
- Server supports GET on 'users/:userid', '/posts/:username' 
- Frontend only has basic main feed page where it gets the feed with an ajax GET call to the server
- Currently just importing sample data for user and posts into the db
