angular.module('util')

.directive("passwordVerify", function () {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, elem, attrs, ngModel) {
        if (!ngModel) return; // do nothing if no ng-model

        // watch own value and re-validate on change
        scope.$watch(attrs.ngModel, function() {
          validate();
        });

        // observe the other value and re-validate on change
        attrs.$observe('passwordVerify', function(val) {
          validate();
        });

        var validate = function() {
          // values
          var val1 = ngModel.$viewValue;
          var val2 = attrs.passwordVerify;
          // set validity
          ngModel.$setValidity('passwordVerify', val1 === val2);
        };
      }
    };
})

.directive('limitChar', function() {
    'use strict';
    return {
        restrict: 'A',
        scope: {
            limit: '=limit',
            ngModel: '=ngModel'
        },
        link: function(scope) {
            scope.$watch('ngModel', function(newValue, oldValue) {
                if (newValue) {
                    var length = newValue.toString().length;
                    if (length > scope.limit) {
                        scope.ngModel = oldValue;
                    }
                }
            });
        }
    };
})

.directive("limiteCaracteres", function() {
  /* NÃO ESTÁ FUNCIONANDO NO MOBILE */
  return {
      restrict: "A",
      require: '?ngModel',
      link: function(scope, elem, attrs, ngModel) {
        var limit = parseInt(attrs.limiteCaracteres);
        angular.element(elem).on("keypress", function(e) {
            if (this.value.length == limit) {
              e.preventDefault(); // não deixa que o conteúdo seja adicionado
              // ngModel.$setValidity('limiteCaracteres', false);
            }
        });

      }
  }
})
