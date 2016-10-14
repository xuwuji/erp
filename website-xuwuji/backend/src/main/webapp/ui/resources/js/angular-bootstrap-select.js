// supply open and close without load bootstrap.js
angular.module('angular-bootstrap-select.extra', [])
    .directive('toggle', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                // prevent directive from attaching itself to everything that defines a toggle attribute
                if (!element.hasClass('selectpicker')) {
                    return;
                }

                var target = element.parent();
                var toggleFn = function () {
                    target.toggleClass('open');
                };
                var hideFn = function () {
                    target.removeClass('open');
                };

                element.on('click', toggleFn);
                element.next().on('click', hideFn);

                scope.$on('$destroy', function () {
                    element.off('click', toggleFn);
                    element.next().off('click', hideFn);
                });
            }
        };
    });

angular.module('angular-bootstrap-select', [])
    .directive('selectpicker', ['$log', '$parse', function ($log, $parse) {
        var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;

        return {
            restrict: 'A',
            require: '?ngModel',
            compile: function (tElement, tAttrs, transclude) {
                //tElement.selectpicker($parse(tAttrs.selectpicker)());
                //tElement.selectpicker('refresh');
                return function (scope, element, attrs, ngModel) {
                    if (!ngModel) return;
                    var optionsExp = attrs.ngOptions;
                    var barOptions = attrs.barOptions;

                    function allOption(optionWidth, allValue){
                      var allContent='<option value="V_VALUE" title="All">All</option>'
                        .replace(/V_VALUE/g, allValue);
                      return allContent;
                    }

                    function createOption(optionWidth, labelWidth, barWidth, valueWidth, text, optionValue, label){
                      var dataContent="<div class='sel-option-container' style='width: V_OPTION_WIDTH'>" +
                            "<div class='sel-option-label' style='width: V_LABEL_WIDTH'>V_LABEL</div>" +
                            "<div class='sel-option-content'>" +
                              "<div class='sel-option-bar' style='width:V_BAR_WIDTH'>" +
                                "<div class='sel-option-bar-line' style='width: V_VALUE_WIDTH'></div>" +
                              "</div>" +
                              "<div class='sel-option-text' style='width: V_BAR_WIDTH'> V_TEXT </div>" +
                            "</div>" +
                          "</div>";

                      dataContent = dataContent.replace(/V_OPTION_WIDTH/g, optionWidth)
                        .replace(/V_LABEL_WIDTH/g, labelWidth)
                        .replace(/V_BAR_WIDTH/g, barWidth)
                        .replace(/V_VALUE_WIDTH/g, valueWidth)
                        .replace(/V_TEXT/g, text)
                        .replace(/V_LABEL/g, label);

                      var str = '<option value="V_VALUE" title="V_LABEL" data-content="V_DATA_CONTENT">V_VALUE</option>'
                                .replace(/V_DATA_CONTENT/g, dataContent)
                                .replace(/V_VALUE/g, optionValue)
                                .replace(/V_LABEL/g, label);

                      //console.log("str", str);
                      return str;

                    }

                    if ( barOptions ){
                      var barOptionValues = $parse(barOptions);
                      //console.log("bar options: ", barOptionValues);

                      scope.$watch(barOptionValues, function(n, o){
                          //console.log("newVal: ", n, "oldVal:", o);
                          if ( typeof n === 'undefined' || n === null) return;
                          element.html('');

                          if ( n.hasAll ){
                            element.append(allOption(n.optionWidth,n.allValue));
                          }

                          for ( var idx = 0; idx < n.items.length; idx++ ){
                            var item = n.items[idx];
                            element.append(
                              createOption(
                                n.optionWidth,
                                n.labelWidth,
                                n.barWidth,
                                item.width,
                                item.text,
                                item.value,
                                item.label)
                            );
                          }

                          element.selectpicker('refresh');
                      }, true);
                    }


                    //to make sure that once the options changes, the drop down changes automatically.
                    if ( optionsExp ){
                        var match = optionsExp.match(NG_OPTIONS_REGEXP);
                        if (!match) {
                            throw ngOptionsMinErr('iexp',
                                "Expected expression in form of " +
                                "'_select_ (as _label_)? for (_key_,)?_value_ in _collection_'" +
                                " but got '{0}'. Element: {1}",
                                optionsExp, startingTag(selectElement));
                        }
                        var valuesFn = $parse(match[7]);

                        scope.$watch(valuesFn, function(n, o){
                            scope.$evalAsync(function() {
                                element.selectpicker('refresh');
                            });
                        });
                    }

                    if ( attrs.ngDisabled ) {
                        scope.$watch(attrs.ngDisabled, function (newVal, oldVal) {
                            scope.$evalAsync(function () {
                                element.selectpicker('refresh');
                            });
                        });
                    }

                    var oldRenderFn = ngModel.$render;

                    if ( attrs.multiple ) {
                        scope.$watchCollection(attrs.ngModel, function (newVal, oldVal) {
                            scope.$evalAsync(function () {
                                element.selectpicker('refresh');
                            });
                        });
                    }else{
                        scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                            if ( newVal == oldVal ) return;
                            scope.$evalAsync(function () {
                                element.selectpicker('refresh');
                            });
                        });
                    }

                    //get original $render function set by select directive.
                    ngModel.$render = function () {
                        scope.$evalAsync(function () {
                            if ( angular.isFunction(oldRenderFn) ) oldRenderFn();
                            element.selectpicker('refresh');
                        });
                    }

                    var selectGroup = $(element[0]).next('.btn-group');
                    $('html').on('click', function (e) {
                        if ($(e.target).closest(selectGroup[0]).length < 1) {
                            $(selectGroup[0]).removeClass('open');
                        }
                    });

                    function initElement(){
                        var options = {};
                        if(attrs.multiple) options.actionsBox = true;
                        if(attrs.width) options.width = attrs.width;
                        element.selectpicker(options);
                    }

                    initElement();
                };
            }

        };
    }]);
