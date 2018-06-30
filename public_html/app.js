const app = angular.module('app', []);

app.controller('appController', function () {
  this.n = 5;
  this.m = 6;
  this.prob = 0.5;
  this.matrix = new Matrix(5 , 6);
  this.testResults = [];
  const maxTestResults = 10;
  const ctrl = this;
  
  this.newMatrix = function () {
    ctrl.matrix = new Matrix(ctrl.n, ctrl.m);
  };
  
  this.autoTest = function () {
    const domainCount = ctrl.matrix.auto(ctrl.prob);
    const testResult = {
      prob: ctrl.prob.toFixed(2),
      domainCount: domainCount,
      size: ctrl.matrix.size()
    };
    ctrl.testResults.push(testResult);
    if (ctrl.testResults.length > maxTestResults) {
      ctrl.testResults.shift();
    }
  };
});

