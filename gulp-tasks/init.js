var gulp = require("gulp");
var argv = require('yargs').argv;
var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var beautify = require('js-beautify').js_beautify;
var prettify = require('js-beautify').html;
var _ = require('lodash');

gulp.task("init", function () {

    var root = "Scripts/app/";

    var questions = [{
        type: 'input',
        name: 'app_name',
        message: 'What\'s the name for your application'
    }];

    inquirer.prompt(questions).then(function (answers) {
        insertAppNameTemplate(root,answers.app_name);
        insertAppNameIndexHTML(answers.app_name);
    });
});

function insertAppNameTemplate(root, appName) {
    var path = root + 'config/global-config.js';
    fs.readFile(path, function (err, data) {
        if (err) {
            return console.error(err);
        }
        var jsContent = data.toString();
        jsContent = jsContent.replace("[[APP_NAME]]", appName);
        jsContent = beautify(jsContent, { indent_size: 4 });
        fs.writeFile(path, jsContent,
            function (err) {
                if (err) {
                    return console.log(err);
                }
            });
    });
}

function insertAppNameIndexHTML(appName) {
    var path = 'index.html';
    fs.readFile(path, function (err, data) {
        if (err) {
            return console.error(err);
        }
        var htmlContent = data.toString();
        htmlContent = htmlContent.replace("[[APP_NAME]]", appName);
        jsConhtmlContenttent = prettify(htmlContent, { indent_size: 4 });
        fs.writeFile(path, htmlContent,
            function (err) {
                if (err) {
                    return console.log(err);
                }
            });
    });
}