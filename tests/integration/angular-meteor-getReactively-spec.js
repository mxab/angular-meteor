describe('$scope.getReactively', function () {
  var $meteorCollection,

    $rootScope,
    $timeout;

  beforeEach(angular.mock.module('angular-meteor'));

  beforeEach(function () {
    jasmine.addMatchers(customMatchers);
  });

  beforeEach(angular.mock.inject(function (_$meteorCollection_, _$rootScope_, _$timeout_) {
    $meteorCollection = _$meteorCollection_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;

    spyOn($rootScope, '$apply').and.callThrough();

  }));


  describe('getReactively on nested properties', function () {
    it('push updates from client handled correctly', function (done) {

      $rootScope.limit = 10;
      var $scope = $rootScope.$new();

      $scope.foo = "bar";
      $scope.vm = {sort: "newest"};

      $scope.$digest();


      $scope.$meteorAutorun(function () {
        expect($scope.getReactively('foo')).toEqual('bar');
        expect($scope.getReactively('vm.limit')).toEqual('newest');
        done()
      });
      $timeout.flush();




    });
  });


});
