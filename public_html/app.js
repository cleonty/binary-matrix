const app = angular.module('app', []);

app.controller('appController', function () {
  this.n = 5;
  this.m = 6;
  this.prob = 0.5;
  this.matrix = null;
  this.testResults = [];
  const maxTestResults = 10;
  const ctrl = this;
  this.matrixEditable = false;
  this.finished = false;
  
  this.newMatrix = function () {
    ctrl.matrix = new Matrix(ctrl.n, ctrl.m);
    ctrl.matrixEditable = true;
  };
  this.toggleColor = function(i, j) {
    if (ctrl.matrixEditable) {
      ctrl.matrix.toggleColor(i, j);
    }
  };
  this.findDomains = function () {
    ctrl.matrix.colorize();
    ctrl.matrixEditable = false;
    ctrl.finished = true;
  };
  this.autoTest = function () {
    ctrl.matrixEditable = false;
    ctrl.finished = true;
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

