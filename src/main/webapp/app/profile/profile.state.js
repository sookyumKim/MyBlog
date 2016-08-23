(function () {
    'use strict';

    angular
        .module('myBlogApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('profile', {
            parent: 'app',
            url: '/profile',
            data: {
                authorities: [],
                pageTitle: 'KSKBLOG-profile'
            },
            views: {
                'content@': {
                    templateUrl: 'app/profile/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'vm'
                }
            }
        })
            .state('profile.modal', {
                parent: 'profile',
                url: '/profile/modal',
                data: {
                    authorities: []
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    return $uibModal.open({
                        templateUrl: 'app/profile/profile-dialog.html',
                        controller: 'ProfileDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg'
                    }).result.then(function () {
                        $state.go('profile', null, {reload: true});
                    }, function () {
                        $state.go('profile');
                    });
                }]
            })
    }
})();
