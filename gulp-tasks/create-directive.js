var gulp = require("gulp");
var argv = require('yargs').argv;
var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var beautify = require('js-beautify').js_beautify;
var prettify = require('js-beautify').html;
var _ = require('lodash');

gulp.task("directive", function () {

    var root = "Scripts/app/";

    var questions = [{
        type: 'input',
        name: 'component_name',
        message: 'For what\'s component is the directive'
    }, {
        type: 'input',
        name: 'directive_name',
        message: 'What\'s the directive name'
    }];

    inquirer.prompt(questions).then(function (answers) {
   
        var componentFolderName = root + answers.component_name + "/directives/";
        var directiveFolderName = componentFolderName + answers.directive_name + "/";

        console.log(componentFolderName);

        if (!fs.existsSync(componentFolderName)) {
           // console.log(componentFolderName);
            fs.mkdirSync(componentFolderName);
        }

        //console.log(directiveFolderName);
        fs.mkdirSync(directiveFolderName);


        var viewPath = directiveFolderName + answers.directive_name + ".html";

        var jsPath = directiveFolderName + answers.directive_name + ".js";

        fs.writeFile(jsPath, beautify(getDirectiveTemplate(viewPath), { indent_size: 4 }),
        function (err) {
            if (err) {
                return console.log(err);
            }
        });

        fs.writeFile(viewPath, "",
            function (err) {
                if (err) {
                    return console.log(err);
                }
            });

        insertRequireIndexTemplate(root, answers.component_name, answers.directive_name);

    });

    function getDirectiveTemplate(viewPath) {
        var sb = "module.exports = {" +
        "    body: function () {" +
        "        return {" +
        "            restrict: 'E'," +
        "            templateUrl: '../" + viewPath + "'," +
        "            transclude: true," +
        "            scope: {" +
        "                options: \"=options\"" +
        "            }," +
        "            controller: function ($scope) {" +
        "            }" +
        "        };" +
        "    }" +
        "};";
        return sb;
    }

    function insertRequireIndexTemplate(root, componentName, directiveName) {
        var template = getIndexTemplate(directiveName);
        var path = root + componentName + '/index.js';
        fs.readFile(path, function (err, data) {
            if (err) {
                return console.error(err);
            }
            var jsContent = data.toString();
            jsContent += template;
            jsContent = beautify(jsContent, { indent_size: 4 });
            fs.writeFile(path, jsContent,
                function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
        });
    }

    function getIndexTemplate(directiveName) {

        var camelCaseName = _.camelCase(directiveName);

        directiveName = directiveName + '/' + directiveName;

        var sb = "app.directive('" + camelCaseName + "', factory.createComponent(require('./directives/" + directiveName + "')));";

        return sb;
    }
});