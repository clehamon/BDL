# BDL6

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 1.0.0.

Install `yo`, `grunt-cli`, `bower`, `generator-angular` and `generator-karma`:
```
npm install -g grunt-cli bower yo generator-karma generator-angular
```

If you are planning on using Sass, you will need to first install Ruby and Compass:
- Install Ruby by downloading from [here](http://rubyinstaller.org/downloads/) or use Homebrew
- Install the compass gem:
```
gem install compass
```

To install the project run `bower install` (may be `sudo bower install --allow-root`) and `npm install`


Look at the Yo Angular generator for commands to create new controllers, views, services, etc..
The only difference is that instead of calling yo angular:xxx we're using yo angularfire:xxx

AngularFire page [here](https://www.firebase.com/docs/web/libraries/angular/) and docs [there](https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebaseobject-bindtoscope-varname)


## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
