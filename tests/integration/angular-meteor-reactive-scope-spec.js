describe('$scope.getCollectionReactively', function () {
  var $rootScope;

  beforeEach(angular.mock.module('angular-meteor'));

  beforeEach(function () {
    jasmine.addMatchers(customMatchers);
  });

  beforeEach(angular.mock.inject(function (_$rootScope_) {

    $rootScope = _$rootScope_;

    spyOn($rootScope, '$apply').and.callThrough();

  }));


  it('should run reactive on push', function () {

    var $scope = $rootScope.$new();
    $scope.foo = [];
    var callCount = 0;
    $scope.$meteorAutorun(function () {
      $scope.getCollectionReactively('foo');
      callCount++;
    });
    $scope.foo.push("xxx");

    $scope.$digest();
    Tracker.flush();

    expect(callCount).toEqual(2)


  });
  it('should not run if a property is set on array', function () {

    var $scope = $rootScope.$new();

    $scope.foo = [];
    var callCount = 0;
    $scope.$meteorAutorun(function () {
      $scope.getCollectionReactively('foo');
      callCount++;

    });

    $scope.foo.someProperty = 123;

    $scope.$digest();
    expect(callCount).toEqual(1);
    Tracker.flush();
  });

  it('should run if new reference is set', function () {

    var $scope = $rootScope.$new();

    $scope.foo = [];
    var callCount = 0;
    $scope.$meteorAutorun(function () {
      $scope.getCollectionReactively('foo');
      callCount++;
    });


    $scope.foo = [{}];
    $scope.$digest();

    Tracker.flush();
    expect(callCount).toEqual(2);

  });


});
describe('$scope.getReactively', function () {


  beforeEach(function () {
    jasmine.addMatchers(customMatchers);
  });


  it('should have initial scope value', function (done) {

    angular.module('myApp', ['angular-meteor']).controller('MyController', ['$scope', function ($scope) {
      var vm = this;
      vm.message = 'Hello World';

      $scope.$meteorAutorun(function () {
        var message = $scope.getReactively('vm.message');
        expect(message).toBe('Hello World');
        done();
      });
    }]);

    module('myApp');

    inject(function ($controller, $q, $rootScope) {

      var scope = $rootScope.$new();
      $controller('MyController as vm', {$scope: scope});

    })()
    
  });
});
