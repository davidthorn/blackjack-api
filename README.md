# Webpack and Typescript

This project provides a basic skeleton project which can be used to initialise typescript / webpack projects.

It is not the most difficult task but it is very annoying having to configure it every time you start a new project.

# Clone project

Start off by cloning this project and then change into that directory

```bash

git clone https://github.com/davidthorn/webpack-typescript.git <project_name>
cd <project_name>

```

# Creating this project

### Initialise the npm project

In order to use ```npm``` we require to have a ```package.json``` within the project, to do this we can run the ```npm init``` command:

```
npm init
```

You should changed the ```"name", "description", "repository"``` properties etc to suite your own project.

# Install dependencies

We only need webpack for development mode so we can supply ```--save-dev```instead of just ``--save``.

Run the following command to install webpack and its cli

```
npm install --save-dev webpack webpack-cli
```

# Install Typescript

Now in order to use Typescript you are going to have to install the language and its transpiler. So install the following package using the -g global command.

```
npm install -g --save-dev typescript
```

Webpack recommends using the ```ts-loader```. To be honest I am not sure what it does and have not researched it either, I just installed it.

```
npm install --save-dev ts-loader
```

# Quick Start

You can run all these commands in one go, 

```
npm install --save-dev typescript ts-loader webpack webpack-cli
```

# Create Webpack config file

Webpack requires a configuration file: `webpack.config.js` to be located within your project so as to know where to output the vanilla javascript code etc.

The installation guide can be found using this link:
[Webpack & Typscript Configuration guide](https://webpack.js.org/guides/typescript/)

Webpack requires initially that it has a typescript configuration file (`tsconfig.json`) too, therefore we need to create one.

This can be done using the typescripts compiler command line interface.

```
tsc --init  
```

This command should have created a `tsconfig.json` in the root directory of your project.

From what I understand we can leave it exactly as it is.

Next create the `webpack.config.js` file in the root directory of your project:

```
touch webpack.config.js
```

Then paste the following code in to that file:

```javascript
const path = require('path');

module.exports = {
  mode: "development",
  watch: false,
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

Nearly there.

# NPM build command

We now need to create a npm command within the `package.json` file in order for this project to be built.

Add the following line to `"scripts"` block in the `package.json` file:

``` 
...,
"scripts": {
  ...
  "build" : "webpack"
},
...
```

You will notice within the `package.json` within this project that it also calls the `tsc` at the end of the build command. This is so that I can review the vanilla code if required.

To build you project you can now run the following command in your terminal:

```
npm run build
```
You should notice that a `bundle.js` file has been created within your `dist` folder.

If you want to change the outputted filename of `bundle.js` to a custom file name the you need to up the `webpack.config.js` file. Change `bundle.js` to whatever you want the file to be called

```
output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
}
```

# Optional content

Due to webpack creating a `dist` directory for your `bundle.js` I decided that it is easy to place all non javascript / typescript files in an `assets` folders within the root folder. Prior to the build command being run, we copy the contents of the `assets` directory to the `dist` directory.

```
mkdir assets
touch assets/layout.css
touch assets/index.html
```
