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


  it('should have the same values in autorun as set on scope', function (done) {


    var $scope = $rootScope.$new();

    $scope.foo = "bar";
    $scope.vm = {sort: "newest"};


    $scope.$meteorAutorun(function () {
      expect($scope.getReactively('foo')).toEqual('bar');
      expect($scope.getReactively('vm.sort')).toEqual('newest');
      done()
    });
    $timeout.flush();


  });


});
