﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('fullCtrl', fullCtrl);

    fullCtrl.$inject = ['$scope', 'fullClubSvc'];

    function fullCtrl($scope, fullClubSvc) {
        $scope.title = 'full paging';
        $scope.description = 'A fully paged list of clubs. The pager directive manages the page navigation. The fullClubService only loads a page when it clicked on for the first time';

        $scope.pages = fullClubSvc.pages;
        $scope.info = fullClubSvc.paging.info;
        $scope.options = fullClubSvc.paging.options;
        
        $scope.navigate = navigate;        
        $scope.clear = optionsChanged;

        $scope.fetchedverbatim = 'Verbatim fetcehd';

        $scope.status = {
            type: "info",
            message: "ready",
            busy: false
        };
        $scope.displayVerbatim = function (c) {
            alert("full ctr  " + c.verbatim);
            $scope.description = c.verbatim;
            //return c.verbatim;
        };

        activate();

        function activate() {
            //if this is the first activation of the controller load the first page
            if (fullClubSvc.paging.info.currentPage === 0) {
                navigate(1);
            }
        }

        //function displayVerbatim() { alert("Full Contr");}

        function navigate(pageNumber) {
            $scope.status.busy = true;
            $scope.status.message = "loading records";            

            fullClubSvc.navigate(pageNumber)
                            .then(function () {
                                $scope.status.message = "ready";
                            }, function (result) {
                                $scope.status.message = "something went wrong: " + (result.error || result.statusText);
                            })
                            ['finally'](function () {
                                $scope.status.busy = false;
                            });
        }

        function optionsChanged() {
            fullClubSvc.clear();
            activate();
        }
    }
})();