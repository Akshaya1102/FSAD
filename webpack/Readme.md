1.	Project Setup:
o	Create a new directory for your project.
o	Inside this directory, initialize a new Node.js project using npm init.
2.	Install Webpack:
o	Install Webpack as a development dependency:
o	npm install webpack webpack-cli --save-dev
3.	Create Source Files:
o	Create the following files in your project directory: 
	index.html: The main HTML file.
	src/index.js: A simple JavaScript file.
	src/styles.css: A CSS file.
	src/logo.png: An image file.
4.	Configure Webpack:
o	Create a webpack.config.js file in your project root:
o	// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
5.	Write Some Code:
o	In src/index.js, add a simple script:
o	// src/index.js
o	console.log('Hello from Webpack!');
6.	Bundle with Webpack:
o	Run the following command to bundle your code:
o	npx webpack
o	This will create a dist directory with a bundle.js file containing your bundled code.
7.	Include in HTML:
In index.html, include the bundled script:
