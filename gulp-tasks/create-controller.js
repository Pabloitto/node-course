var gulp = require("gulp");
var argv = require('yargs').argv;
var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var beautify = require('js-beautify').js_beautify;
var _ = require('lodash');

gulp.task("controller", function () {

    var root = "Scripts/app/";

    var questions = [{
        type: 'input',
        name: 'component_name',
        message: 'For what\'s component is the controller'
    }, {
        type: 'input',
        name: 'controller_name',
        message: 'What\'s the controller name'
    }];

    inquirer.prompt(questions).then(function (answers) {

        var componentFolderName = root + answers.component_name + "/controllers/";

        console.log(componentFolderName);

        if (!fs.existsSync(componentFolderName)) {
            // console.log(componentFolderName);
            fs.mkdirSync(componentFolderName);
        }


        var jsPath = componentFolderName + answers.controller_name + ".js";

        fs.writeFile(jsPath, beautify(getControllerTemplate(), { indent_size: 4 }),
        function (err) {
            if (err) {
                return console.log(err);
            }
        });

        insertRequireIndexTemplate(root, answers.component_name, answers.controller_name);
    });

    function getControllerTemplate(controllerName) {
        var title = controllerName.toUpperCase();
        var sb = "module.exports = {" +
                 "    imports: ['$scope']," +
                 "    body: function ($scope) {" +
                 "        $scope.layoutOptions = {" +
                 "            title: '" + title + "'," +
                 "            breadCrumbsOptions: {" +
                 "                IsActive: false," +
                 "                Text: '" + title + "'," +
                 "                CssIcon: ''" +
                 "            }" +
                 "        };" +
                 "    }" +
                 "};";
        return sb;
    }

    function insertRequireIndexTemplate(root, componentName, controllerName) {
        var template = getIndexTemplate(controllerName);
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

    function getIndexTemplate(controllerName) {

        var camelCaseName = _.camelCase(controllerName);

        var sb = "app.controller('" + camelCaseName + "', factory.createComponent(require('./controllers/" + controllerName + "')));";

        return sb;
    }
});