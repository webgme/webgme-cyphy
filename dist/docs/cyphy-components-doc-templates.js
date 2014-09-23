angular.module("cyphy.demoApp.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/docs/cyphy_components_docs.html","<!DOCTYPE html>\n<html data-ng-app=\"cyphy.demoApp\">\n<head>\n    <title>CyPhy Components Documentation</title>\n\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css\">\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"https://code.jquery.com/ui/1.11.1/themes/black-tie/jquery-ui.css\">\n    <link type=\"text/css\" href=\"//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css\" rel=\"stylesheet\">\n\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"../../bower_components/isis-ui-components/dist/isis-ui-components.css\">\n\n    <link type=\"text/css\" rel=\"stylesheet\" href=\"cyphy-components-docs.css\">\n    <!--<link type=\"text/css\" rel=\"stylesheet\" href=\"../cyphy-components.css\">-->\n\n</head>\n<body>\n<div ng-controller=\"CyPhyComponentsDemoController\" class=\"container\">\n\n    <h1>cyphy.ui.components</h1>\n\n    <section ng-repeat=\"component in components\" id=\"{{ component.name }}\">\n        <div class=\"page-header\">\n            <h1>{{ component.name }}\n                <small>(cyphy.ui.{{ component.name }})</small>\n            </h1>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-md-6 show-grid\" ng-include=\"component.template\">\n\n            </div>\n            <div btf-markdown class=\"col-md-6\" ng-include=\"component.docs\">\n            </div>\n        </div>\n            <div class=\"row\">\n                <tabset class=\"col-md-12\" ng-if=\"component.sources\">\n                    <tab ng-repeat=\"sourceFile in component.sources\"\n                         heading=\"{{sourceFile.fileName}}\"\n                         select=\"selectedSourceFile=sourceFile\">\n                        <div ui-codemirror\n                             ui-codemirror-opts=\"sourceFile.viewerOptions\"\n                             ng-model=\"sourceFile.code\"\n                             ui-refresh=\"selectedSourceFile\"\n                             >\n\n                        </div>\n                    </tab>\n                </tabset>\n            </div>\n\n    </section>\n\n</div>\n<script src=\"https://code.jquery.com/jquery-2.1.1.min.js\"></script>\n<script src=\"https://code.jquery.com/ui/1.11.1/jquery-ui.min.js\"></script>\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular.min.js\"></script>\n<script src=\"//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js\"></script>\n<script src=\"http://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls.js\"></script>\n\n<script src=\"../../bower_components/isis-ui-components/dist/isis-ui-components.js\"></script>\n<script src=\"../../bower_components/isis-ui-components/dist/isis-ui-components-templates.js\"></script>\n\n\n<script src=\"../cyphy-components.js\"></script>\n<script src=\"../cyphy-components-templates.js\"></script>\n\n<script src=\"cyphy-components-docs.js\"></script>\n<script src=\"cyphy-components-doc-templates.js\"></script>\n\n</body>\n</html>");
$templateCache.put("/library/ComponentList/docs/demo.html","<div>\n    <component-list data-workspace-id=\"\'/1/2/3/4/5/6\'\"></component-list>\n</div>");
$templateCache.put("/library/DesignList/docs/demo.html","<div>\n    <design-list data-workspace-id=\"\'/1/2/3/4/5/6\'\"></design-list>\n</div>");
$templateCache.put("/library/TestBenchList/docs/demo.html","<div>\n    <test-bench-list data-workspace-id=\"\'/1/2/3/4/5/6\'\"></test-bench-list>\n</div>");
$templateCache.put("/library/WorkspaceList/docs/demo.html","<div>\n    <workspace-list></workspace-list>\n</div>");
$templateCache.put("/docs/docs_app.js","/*globals angular, require, window, console */\n\'use strict\';\n\nvar components = [\n    {\n        name: \'WorkspaceList\',\n        sources: [ \'demo.html\', \'demo.js\']\n    },\n    {\n        name: \'ComponentList\',\n        sources: [ \'demo.html\', \'demo.js\']\n    },\n    {\n        name: \'DesignList\',\n        sources: [ \'demo.html\', \'demo.js\']\n    },\n    {\n        name: \'TestBenchList\',\n        sources: [ \'demo.html\', \'demo.js\']\n    }\n];\n\nrequire(\'chance\');\n\nangular.module(\'gme.services\', []);\n\nrequire(\'../library/WorkspaceList/docs/demo.js\');\nrequire(\'../library/ComponentList/docs/demo.js\');\nrequire(\'../library/DesignList/docs/demo.js\');\nrequire(\'../library/TestBenchList/docs/demo.js\');\n\n\nrequire(\'angular-sanitize\');\nwindow.Showdown = require(\'showdown\');\nrequire(\'angular-markdown-directive\');\n\nrequire(\'codemirrorCSS\');\nwindow.CodeMirror = require(\'code-mirror\');\n\nrequire(\'code-mirror/mode/htmlmixed\');\nrequire(\'code-mirror/mode/xml\');\nrequire(\'code-mirror/mode/javascript\');\n\nrequire(\'angular-ui-codemirror\');\n\n\n\nvar demoApp = angular.module(\n    \'cyphy.demoApp\',\n    [\n        \'cyphy.demoApp.templates\',\n        \'btford.markdown\',\n        \'ui.codemirror\',\n        \'ui.bootstrap\',\n        \'isis.ui.components\'\n    ].concat(components.map(function (e) {\n        return \'cyphy.ui.\' + e.name + \'.demo\';\n    }))\n);\n\ndemoApp.run(function () {\n    console.log(\'DemoApp run...\');\n});\n\ndemoApp.controller(\n    \'CyPhyComponentsDemoController\',\n    function ($scope, $templateCache) {\n\n        var fileExtensionRE,\n            codeMirrorModes;\n\n        fileExtensionRE = /(?:\\.([^.]+))?$/;\n\n        codeMirrorModes = {\n            \'js\': \'javascript\',\n            \'html\': \'htmlmixed\'\n        };\n\n        $scope.components = components.map(function (component) {\n            var sources,\n                viewerOptions,\n                fileExtension;\n\n            if (angular.isArray(component.sources)) {\n                sources = component.sources.map(function (sourceFile) {\n\n                    fileExtension = fileExtensionRE.exec(sourceFile);\n\n                    viewerOptions = {\n                        lineWrapping: true,\n                        lineNumbers: true,\n                        readOnly: \'nocursor\',\n                        mode: codeMirrorModes[fileExtension[1]] || \'xml\'\n                    };\n\n                    return {\n                        fileName: sourceFile,\n                        code: $templateCache.get(\'/library/\' + component.name + \'/docs/\' + sourceFile),\n                        viewerOptions: viewerOptions\n                    };\n                });\n            }\n\n            return {\n                name: component.name,\n                template: \'/library/\' + component.name + \'/docs/demo.html\',\n                docs: \'/library/\' + component.name + \'/docs/readme.md\',\n                sources: sources\n            };\n        });\n\n    });");
$templateCache.put("/library/ComponentList/docs/demo.js","/*globals console, angular, Chance*/\n\n\'use strict\';\n\nvar demoApp = angular.module(\'cyphy.ui.ComponentList.demo\', [\n    \'cyphy.components\',\n    \'cyphy.components.templates\'\n]);\n\n// overwrite ComponentService with dummy data\ndemoApp.service(\'ComponentService\', function () {\n    var components = [];\n\n    this.watchComponents = function (parentContext, workspaceId, updateListener) {\n        var generateComponent,\n            numComps = self.chance.integer({min: 1, max: 5}),\n            i;\n\n        generateComponent = function (id) {\n            return {\n                id: id,\n                title: self.chance.name(),\n                toolTip: \'Open item\',\n                description: self.chance.sentence(),\n                lastUpdated: {\n                    time: self.chance.date({year: (new Date()).getFullYear()}),\n                    user: self.chance.name()\n                },\n                stats: [\n                    {\n                        value: \'Modelica \' + self.chance.integer({min: 0, max: 5}),\n                        toolTip: \'Modelica\'\n                        //iconClass: \'fa fa-puzzle-piece\'\n                    },\n                    {\n                        value: \'CAD \' + self.chance.integer({min: 0, max: 3}),\n                        toolTip: \'CAD\'\n//                    iconClass: \'fa fa-cubes\'\n                    },\n                    {\n                        value: \'Manufacturing \' + self.chance.integer({min: 0, max: 1}),\n                        toolTip: \'Manufacturing\'\n//                    iconClass: \'glyphicon glyphicon-saved\'\n                    }\n                ]\n                //details    : \'Some detailed text. Lorem ipsum ama fea rin the poc ketofmyja cket.\'\n            };\n        };\n\n        for (i = 0; i < numComps; i += 1) {\n            components.push(generateComponent(i));\n        }\n\n        updateListener(null, components);\n\n    };\n\n});");
$templateCache.put("/library/DesignList/docs/demo.js","/*globals console, angular, Chance*/\n\n\'use strict\';\n\nvar demoApp = angular.module(\'cyphy.ui.DesignList.demo\', [\n    \'cyphy.components\',\n    \'cyphy.components.templates\'\n]);\n\ndemoApp.service(\'DesignService\', function () {\n\n});");
$templateCache.put("/library/TestBenchList/docs/demo.js","/*globals console, angular, Chance*/\n\n\'use strict\';\n\nvar demoApp = angular.module(\'cyphy.ui.TestBenchList.demo\', [\n    \'cyphy.components\',\n    \'cyphy.components.templates\'\n]);\n\ndemoApp.service(\'TestBenchService\', function () {\n\n});");
$templateCache.put("/library/WorkspaceList/docs/demo.js","/*globals console, angular, Chance*/\n\n\'use strict\';\n\nvar demoApp = angular.module(\'cyphy.ui.WorkspaceList.demo\', [\n    \'cyphy.components\',\n    \'cyphy.components.templates\'\n]);\n\n// overwrite WorkspaceService with dummy data\ndemoApp.service(\'WorkspaceService\', function () {\n    var self = this,\n        workspaces = [],\n        itemGenerator;\n\n    itemGenerator = function (id) {\n        return {\n            id: id,\n            title: self.chance.name(),\n            toolTip: \'Open item\',\n            description: self.chance.sentence(),\n            lastUpdated: {\n                time: self.chance.date({year: (new Date()).getFullYear()}),\n                user: self.chance.name()\n            },\n            stats: [\n                {\n                    value: self.chance.integer({min: 0, max: 5000}),\n                    toolTip: \'Components\',\n                    iconClass: \'fa fa-puzzle-piece\'\n                },\n                {\n                    value: self.chance.integer({min: 0, max: 50}),\n                    toolTip: \'Design Spaces\',\n                    iconClass: \'fa fa-cubes\'\n                },\n                {\n                    value: self.chance.integer({min: 0, max: 500}),\n                    toolTip: \'Test benches\',\n                    iconClass: \'glyphicon glyphicon-saved\'\n                },\n                {\n                    value: self.chance.integer({min: 0, max: 20}),\n                    toolTip: \'Requirements\',\n                    iconClass: \'fa fa-bar-chart-o\'\n                }\n            ]\n            //details    : \'Some detailed text. Lorem ipsum ama fea rin the poc ketofmyja cket.\'\n        };\n    };\n\n    this.getWorkspaces = function () {\n        var numItems,\n            i;\n\n        console.log(\'Getting workspaces ...\');\n\n        self.chance = new Chance();\n        numItems = self.chance.integer({min: 2, max: 15});\n\n        for (i = 0; i < numItems; i += 1) {\n            workspaces.push(itemGenerator(i));\n        }\n\n        console.log(\'Got workspaces \', workspaces.length);\n\n        return workspaces;\n    };\n\n    this.createWorkspace = function (data, otherWorkspaceId) {\n        var key,\n            newWorkspace = itemGenerator();\n\n        // TODO: if other workspace is defined then copy it and update with data\n        for (key in data) {\n            if (data.hasOwnProperty(key)) {\n                newWorkspace[key] = data[key];\n            }\n        }\n\n        workspaces.push(newWorkspace);\n    };\n\n    this.deleteWorkspace = function (id) {\n        var index = workspaces.map(function (e) {\n            return e.id;\n        }).indexOf(id);\n        if (index > -1) {\n            workspaces.splice(index, 1);\n        }\n    };\n\n\n});");
$templateCache.put("/library/ComponentList/docs/readme.md","TODO: add description of `ComponentList`");
$templateCache.put("/library/DesignList/docs/readme.md","TODO: add description of `DesignList`");
$templateCache.put("/library/TestBenchList/docs/readme.md","TODO: add description of `TestBenchList`");
$templateCache.put("/library/WorkspaceList/docs/readme.md","`WorkspaceList` components lists all workspaces in a WebGME project that uses the `ADMEditor` meta-model.\n\nWorkspace item structure\n\n* `id` - {string} identifier\n* `name` - {string} displayed name\n* `toolTip` - {string} tool tip on displayed name\n* `description` - {string} short description of the content\n* `lastUpdated` - {object} \n    - `time` - {date|string} date of last update\n    - `user` - {name} username who last updated\n* `stats` - {array of object} summary of statistics (components, design spaces, test benches, requirements)\n\nSee `demo.js` for an example.");}]);