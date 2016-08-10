var gulp = require("gulp");
var argv = require('yargs').argv;
var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var beautify = require('js-beautify').js_beautify;
var _ = require('lodash');

gulp.task("service", function () {

    var root = "Scripts/app/";

    var questions = [{
        type: 'input',
        name: 'component_name',
        message: 'For what\'s component is the service'
    }, {
        type: 'input',
        name: 'service_name',
        message: 'What\'s the service name'
    }];

    inquirer.prompt(questions).then(function (answers) {

        var componentFolderName = root + answers.component_name + "/services/";

        console.log(componentFolderName);

        if (!fs.existsSync(componentFolderName)) {
            // console.log(componentFolderName);
            fs.mkdirSync(componentFolderName);
        }


        var jsPath = componentFolderName + answers.service_name + ".js";

        fs.writeFile(jsPath, beautify(getServiceTemplate(), { indent_size: 4 }),
        function (err) {
            if (err) {
                return console.log(err);
            }
        });

        insertRequireIndexTemplate(root, answers.component_name, answers.service_name);
    });

    function getServiceTemplate() {
        var sb = "module.exports = {" +
                 "    imports: ['$http']," +
                 "    body: function ($http) {" +
                 "    }" +
                 "};";
        return sb;
    }

    function insertRequireIndexTemplate(root, componentName, serviceName) {
        var template = getIndexTemplate(serviceName);
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

    function getIndexTemplate(serviceName) {

        var camelCaseName = _.camelCase(serviceName);

        var sb = "app.service('" + camelCaseName + "', factory.createComponent(require('./services/" + serviceName + "')));";

        return sb;
    }
});