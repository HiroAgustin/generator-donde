;(function (yosay, yeoman)
{
  'use strict';

  module.exports = yeoman.generators.Base.extend({

    initializing: function ()
    {
      this.pkg = require('../package.json');
    }

  , prompting: function ()
    {
      var done = this.async()

      , prompts = [
          {
            type: 'list'
          , name: 'color'
          , message: 'Choose main color:'
          , default: 8
          , choices: [
              {name: 'Navy', value: '#001F3F'}
            , {name: 'Blue', value: '#0074D9'}
            , {name: 'Aqua', value: '#7FDBFF'}
            , {name: 'Teal', value: '#39CCCC'}
            , {name: 'Olive', value: '#3D9970'}
            , {name: 'Green', value: '#2ECC40'}
            , {name: 'Lime', value: '#01FF70'}
            , {name: 'Yellow', value: '#FFDC00'}
            , {name: 'Orange', value: '#FF851B'}
            , {name: 'Red', value: '#FF4136'}
            , {name: 'Maroon', value: '#85144B'}
            , {name: 'Fuchsia', value: '#F012BE'}
            , {name: 'Purple', value: '#B10DC9'}
            , {name: 'Black', value: '#111111'}
            , {name: 'Gray', value: '#AAAAAA'}
            , {name: 'Silver', value: '#DDDDDD'}
            , {name: 'White', value: '#FFFFFF'}
            ]
          }
        , {
            type: 'confirm'
          , name: 'isHeroku'
          , message: 'Include Procfile? (heroku)'
          , default: true
          }
        ];

      // Have Yeoman greet the user.
      this.log(yosay('Creating new Donde app!'));

      this.prompt(prompts, function (props)
      {
        this.color = props.color;
        this.isHeroku = props.isHeroku;

        done();

      }.bind(this));
    }

  , writing: {

      projectfiles: function ()
      {
        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');

        this.src.copy('Gruntfile.js', 'Gruntfile.js');

        this.src.copy('editorconfig', '.editorconfig');
        this.src.copy('jshintrc', '.jshintrc');
      }

    , git: function ()
      {
        this.src.copy('gitattributes', '.gitattributes');
        this.src.copy('gitignore', '.gititnore');
      }

    , app: function ()
      {
        if (this.isHeroku)
          this.src.copy('app/Procfile', 'app/Procfile');

        this.template('app/index.html');

        this.src.copy('app/robots.txt', 'app/robots.txt');
        this.src.copy('app/markers.json', 'app/markers.json');
        this.src.copy('app/app.appcache', 'app/app.appcache');

        this.template('app/_package.json', 'app/package.json');

        this.src.copy('app/server/index.js', 'app/server/index.js');
      }

    , scripts: function ()
      {
        this.src.copy('app/scripts/main.js', 'app/scripts/main.js');
      }

    , styles: function ()
      {
        this.template('app/styles/_variables.scss');
        this.directory('app/styles/vendor', 'app/styles/vendor');
        this.src.copy('app/styles/main.scss', 'app/styles/main.scss');
      }
    }

  , end: function ()
    {
      this.installDependencies();
    }
  });

}(require('yosay'), require('yeoman-generator')));
