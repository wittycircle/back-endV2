#Wittycircle backend v.2.0

👉 Development wiki [here](https://github.com/wittycircle/back-endV2/wiki)

##Running
`npm install`   
`brew services start/restart redis || redis-server`  
`start mysql`  
`nodemon server.js`  

##Troubleshooting
1. `ERROR: SQL ..... 'sql_mode='` =>
run `gulp sql-fix` to set `sql_mode` to _`ONLY_FULL_GROUP_BY`_

##Documentation
`gulp api-gen` _generates last documentation revision_  
`gulp api` _generates/open documentation in `Google Chrome`_

##Tests
`gulp test` _launch unit tests with `mochawesome`_  
`gulp test-gui` _launch & open unit tests results with `google chrome`_


##Folders
1. `app` express application, routes and all the magic stuff
    1. `config` non sensitive config
    2. `private` not pushed by default (in `.gitignore`) as it contains the app `api tokens`
    3. `middlewares` for _session_, _error_ and _debug_ middlewares
2. `api-doc` api definitions as annotations in `.js` files
3. `public` static resources
4. `dump` mysql/redis dump
5. `tests` unit tests `.test.js` files
