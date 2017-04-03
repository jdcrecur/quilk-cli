# quilk-cli

A simple and quick way to setup a nodejs application ready to go with sockets, api and view routes.

Do expect the structure to keep changing till version 1 is released. 
This is still currently a proof of concept for now.

## To install run
```
npm install -g quilk-cli
```

## To use quilk-cli

This installs a skeleton app pre-configured with webpack, express and nunjucks tpl engine. Plus a few other extra goodies.
```
quilk-cli install-light
```

The full app is now pre-configured with user authentication. Just `npm install -g quilk webpack` to run webpack and quilk and your app is built.. 
The default app will display a pretty login form, a register form then once logged in a simple api tester.
```
quilk-cli install-full
```

This displays the help available for quilk-cli... although there is only these 2 commands at the moment :)
```
quilk-cli --help
```

## Latest commits
* The install-full got some more fleshing out on the front end. It is now on the new ecmascript 6 shizzle, I threw in a little router in there too.
* If you are used to the routes -> controllers pattern from other frameworks, including this node app this will make sense. Each router maps to a controller... Just ensure quilk is on 2.0.5+ and you are good to go.