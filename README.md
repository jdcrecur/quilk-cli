# quilk-cli

A simple and quick way to setup a nodejs application ready to go with sockets, api and view routes.

Do expect the structure to keep changing till version 1 is released. 
This is still currently a proof of concept for now.

## To install run
```
npm install -g quilk-cli
```

## To use quilk-cli

This installs a sleton app pre-configured with webpack, express and nunjucks tpl engine. Plus a few other extra goodies.
```
quilk-cli install-light
```
Full with eventually house everything from auth to email to event queing system to socket connection options.
```
quilk-cli install-full
```

Up next, preconfigured mongo database with user model and email authentication with passportjs.

This displays the help available for quilk-cli... although there is only these 2 commands at the moment :)
```
quilk-cli --help
```

