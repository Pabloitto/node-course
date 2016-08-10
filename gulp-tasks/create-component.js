var gulp = require("gulp");
var argv = require('yargs').argv;
var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var beautify = require('js-beautify').js_beautify;
var prettify = require('js-beautify').html;
var _ = require('lodash');
gulp.task("component", function () {

    var root = "Scripts/app/";

    var questions = [{
        type: 'input',
        name: 'controller_name',
        message: 'What\'s the name for your component'
    }, {
        type: 'input',
        name: 'route',
        message: 'What\'s the route'
    }];

    inquirer.prompt(questions).then(function (answers) {
        var newControllerPath = root + answers.controller_name;
        fs.mkdirSync(newControllerPath);
        fs.mkdirSync(newControllerPath + "/controllers");
        fs.mkdirSync(newControllerPath + "/views");

        var viewFileName = answers.controller_name + "-view";

        var controllerFileName = answers.controller_name + "-controller";

        var viewFilePath = newControllerPath + "/views/" + viewFileName + ".html";

        var controllerTemplate = beautify(getControllerTemplate(answers.controller_name), { indent_size: 4 });

        fs.writeFile(newControllerPath + "/controllers/" + controllerFileName + ".js", controllerTemplate,
            function (err) {
                if (err) {
                    return console.log(err);
                }
            });

        fs.writeFile(viewFilePath, getViewTemplate(answers.controller_name),
            function (err) {
                if (err) {
                    return console.log(err);
                }
            });

        var indexContent = beautify(getIndexTemplate(controllerFileName), { indent_size: 4 });

        fs.writeFile(newControllerPath + "/index.js", indexContent,
            function (err) {
                if (err) {
                    return console.log(err);
                }
            });

        var routesContent = beautify(getRoutesTemplate(controllerFileName, answers.route, viewFilePath), { indent_size: 4 });

        fs.writeFile(newControllerPath + "/routes.js", routesContent,
            function (err) {
                if (err) {
                    return console.log(err);
                }
            });

        insertRequireIndexTemplate(root, answers.controller_name);
        insertRequireRouteTemplate(root, answers.controller_name);

    });
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

function getViewTemplate(controllerName) {
    var title = controllerName.toUpperCase();
    var html = "<layout options='layoutOptions'><div></div></layout>";
    var template = prettify(html, { indent_size: 4 });
    return template.toString();
}

function getIndexTemplate(controllerName) {

    var camelCaseName = _.camelCase(controllerName);

    var sb = "var globals = require(\"../config/global-config\");" + 
             "var app = require(\"angular\").module(globals.APP_NAME);" +
             "var factory = require(\"./../component-factory\");" +
             "app.controller('" + camelCaseName + "', factory.createComponent(require('./controllers/" + controllerName + "')));";

    return sb;
}

function getRoutesTemplate(controllerName, routeName, viewFilePath) {

    var camelCaseName = _.camelCase(controllerName);

    var sb = "module.exports = function ($routeProvider) {" +
                "    return {" +
                "        create: function () {" +
                "            $routeProvider.when('/" + routeName + "', {" +
                "                templateUrl: '../" + viewFilePath + "'," +
                "                controller: '" + camelCaseName + "'" +
                "            });" +
                "        }" +
                "    }" +
                "};";

    return sb;
}

function insertRequireRouteTemplate(root, controllerName) {
    var template = "require('./../" + controllerName + "/routes')($routeProvider).create();";
    var path = root + 'config/routes-config.js';
    fs.readFile(path, function (err, data) {
        if (err) {
            return console.error(err);
        }
        var jsContent = data.toString();
        jsContent = jsContent.replace("//{{INSERTHERE}}", template + "\n //{{INSERTHERE}}");
        jsContent = beautify(jsContent, { indent_size: 4 });
        fs.writeFile(path, jsContent,
            function (err) {
                if (err) {
                    return console.log(err);
                }
            });
    });
}

function insertRequireIndexTemplate(root, controllerName) {
    var template = "require('./../" + controllerName + "/index');";
    var path = root + 'config/dependencies-config.js';
    fs.readFile(path, function (err, data) {
        if (err) {
            return console.error(err);
        }
        var jsContent = data.toString();
        jsContent = jsContent.replace("//{{INSERTHERE}}", template + "\n //{{INSERTHERE}}");
        jsContent = beautify(jsContent, { indent_size: 4 });
        fs.writeFile(path, jsContent,
            function (err) {
                if (err) {
                    return console.log(err);
                }
            });
    });
}