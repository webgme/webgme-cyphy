/*globals angular, console, document*/
'use strict';

/**
 * @author pmeijer / https://github.com/pmeijer
 * @author lattmann / https://github.com/lattmann
 */

angular.module('cyphy.components')
    .controller('WorkspaceListController', function ($scope, WorkspaceService) {
        var self = this,
            items = [], //$scope.items,
            workspaceItems = {},
            config,
            context = {
                db: 'my-db-connection-id',  // FIXME: This should come from the view..
                projectId: 'ADMEditor',     // FIXME: This should come from the view..
                branchId: 'master',         // FIXME: This should come from the view..
                regionId: 'WorkspaceListController_' + (new Date()).toISOString()
            },
            serviceData2WorkspaceItem;

        console.log('WorkspaceListController');

        config = {

            sortable: false,
            secondaryItemMenu: true,
            detailsCollapsible: true,
            showDetailsLabel: 'Show details',
            hideDetailsLabel: 'Hide details',

            // Event handlers

            itemSort: function (jQEvent, ui) {
                console.log('Sort happened', jQEvent, ui);
            },

            itemClick: function (event, item) {
                console.log('Clicked: ' + item);
                document.location.hash =
                    '/workspaceDetails//' + item.id;
            },

            itemContextmenuRenderer: function (e, item) {
                console.log('Contextmenu was triggered for node:', item);

                return [
                    {
                        items: [

                            {
                                id: 'openInEditor',
                                label: 'Open in Editor',
                                disabled: false,
                                iconClass: 'glyphicon glyphicon-edit'
                            },
                            {
                                id: 'duplicateWorkspace',
                                label: 'Duplicate',
                                disabled: false,
                                iconClass: 'fa fa-copy copy-icon',
                                actionData: {id: item.id},
                                action: function (data) {
                                    WorkspaceService.duplicateWorkspace(context, data.id);
                                }
                            },
                            {
                                id: 'editWorkspace',
                                label: 'Edit',
                                disabled: true,
                                iconClass: 'glyphicon glyphicon-pencil'
                            },
                            {
                                id: 'exportAsXME',
                                label: 'Export as XME',
                                disabled: false,
                                iconClass: 'glyphicon glyphicon-share-alt',
                                actionData: { id: item.id },
                                action: function (data) {
                                    console.log(data);
                                }
                            }
                        ]
                    },
                    {
                        //label: 'Extra',
                        items: [

                            {
                                id: 'delete',
                                label: 'Delete',
                                disabled: false,
                                iconClass: 'fa fa-plus',
                                actionData: { id: item.id },
                                action: function (data) {
                                    WorkspaceService.deleteWorkspace(context, data.id);
                                }
                            }
                        ]
                    }
                ];
            },

            detailsRenderer: function (item) {
                //                item.details = 'My details are here now!';
            },

            newItemForm: {
                title: 'Create new item',
                itemTemplateUrl: '/cyphy-components/templates/WorkspaceNewItem.html',
                expanded: false,
                controller: function ($scope) {
                    $scope.createItem = function (newItem) {

                        WorkspaceService.createWorkspace(context, newItem);

                        $scope.newItem = {};

                        config.newItemForm.expanded = false; // this is how you close the form itself

                    };
                }
            },

            filter: {
            }

        };

        $scope.listData = {
            items: items
        };

        $scope.config = config;


        serviceData2WorkspaceItem = function (data) {
            var workspaceItem;

            if (workspaceItems.hasOwnProperty(data.id)) {
                workspaceItem = workspaceItems[data.id];
                workspaceItem.name = data.name;
                workspaceItem.description = data.description;
            } else {
                workspaceItem = {
                    id: data.id,
                    title: data.name,
                    toolTip: 'Open item',
                    description: data.description,
                    lastUpdated: {
                        time: new Date(), // TODO: get this
                        user: 'N/A' // TODO: get this
                    },
                    stats: [
                        {
                            value: 0, // TODO: get this
                            toolTip: 'Components',
                            iconClass: 'fa fa-puzzle-piece'
                        },
                        {
                            value: 0, // TODO: get this
                            toolTip: 'Design Spaces',
                            iconClass: 'fa fa-cubes'
                        },
                        {
                            value: 0, // TODO: get this
                            toolTip: 'Test benches',
                            iconClass: 'glyphicon glyphicon-saved'
                        },
                        {
                            value: 0, // TODO: get this
                            toolTip: 'Requirements',
                            iconClass: 'fa fa-bar-chart-o'
                        }
                    ]
                };

                workspaceItems[workspaceItem.id] = workspaceItem;
                items.push(workspaceItem);
            }
        };


        WorkspaceService.watchWorkspaces(context, function (updateObject) {
            var index;

            if (updateObject.type === 'load') {
                serviceData2WorkspaceItem(updateObject.data);

            } else if (updateObject.type === 'update') {
                serviceData2WorkspaceItem(updateObject.data);

            } else if (updateObject.type === 'unload') {
                if (workspaceItems.hasOwnProperty(updateObject.id)) {
                    index = items.map(function (e) {
                        return e.id;
                    }).indexOf(updateObject.id);
                    if (index > -1) {
                        items.splice(index, 1);
                    }
                    delete workspaceItems[updateObject.id];
                }

            } else {
                throw new Error(updateObject);

            }
        })
            .then(function (data) {
                var workspaceId,
                    workspaceItem;

                for (workspaceId in data.workspaces) {
                    if (data.workspaces.hasOwnProperty(workspaceId)) {
                        serviceData2WorkspaceItem(data.workspaces[workspaceId]);
                    }
                }
            });
    })
    .directive('workspaceList', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/cyphy-components/templates/WorkspaceList.html',
            controller: 'WorkspaceListController'
        };
    });
