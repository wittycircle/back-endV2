#Wittycircle backend v.2.0

👉 Development wiki [here](https://github.com/wittycircle/back-endV2/wiki)

##Running
`npm install`    
`gulp redis` _token server and sessions_
`gulp run` _launch nodejs and `gulp redis`_

##Documentation
`gulp apidoc` _generates last documentation revision_  
`gulp api` _generates/open documentation in `Google Chrome`_

##Tests
`gulp test` _launch unit tests with `mochawesome`_


##Folders
1. `app` express application, routes and all the magic stuff
    1. `config` non sensitive config
    2. `private` not pushed by default (in `.gitignore`) as it contains the app `api tokens`
    3. `middlewares` for _session_, _error_ and _debug_ middlewares
2. `api` api definitions as annotations in `.js` files
3. `public` static resources
4. `dump` mysql/redis dump
5. `tests` unit tests `.test.js` files
