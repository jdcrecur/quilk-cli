# NODE APP
NB: All commands below assume being run from a terminal at the root of the project.

## Build requirements
Nodejs: Min. NodeJS 6.5+ (https://nodejs.org/en/)

Also requires the following node packages after nodeJs is installed:
```
npm install -g webpack
npm install -g quilk
npm install -g pm2
```

## Dependency installations
Before starting you must install all app dependencies
```
npm install
```

## Build Process (dev)
To build the main server file:
```
webpack --config webpack.config.js --watch
```

To build the client side css and js
```
quilk watch
```

In dev. you will likely want to keep an eye on the server logs, see the managing pm2 instances below.


## Build process (live)
```
webpack --config webpack.config.js
```

To build the client side css and js
```
quilk release=prod
```

## Running the server (dev)
To run the server, ensure pm2 is installed then run:

```
pm2 start build/server.js --watch -x -- env=development
```

## Running the server (prod)
Starting in production mode does not require cli args as the system defaults to this.
```
pm2 start build/server.js
```

You may however pass in this variable if you wish
```
pm2 start build/server.js --watch -x -- env=production
```

NB: The ` -x -- ` is not a typo, it is pm2's method of passing cli args into the script.

## Managing pm2 processes
To tail the logs of all pm2 instances
```
pm2 logs
```

Check the status of the pm2 instances
```
pm2 status
```

Stop and remove all instances with
```
pm2 delete all
```

Or with a known instance if (eg "1" run pm2 status to discover)
```
pm2 delete 1
```

Restart all pm2 instances:
```
pm2 restart all
```

## Example apache proxy redirect vhost config file
This is an example proxy redirect virtual host file if running from apache2. Ensure that the port number matches the port of the app. In this case the default is 3010.
```
<VirtualHost *:80>
    ServerName <your domain here>

    ProxyPass / http://localhost:3010/
    ProxyPassReverse / http://localhost:3010/
    ProxyPreserveHost on
    LogLevel debug

</VirtualHost>
```

## Database
None, this app does not yet connect to a database.