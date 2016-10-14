var dashboardApp = angular.module('dashboardApp', ['ngRoute', 'ckeditor', 'ngSanitize', 'angular-bind-html-compile', 'angular-bootstrap-select', 'daterangepicker']);
dashboardApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
    when('/insert', {
        templateUrl: './template/insert.html',
        controller: 'insertController'
    }).when('/', {
        templateUrl: './template/report.html',
        controller: 'reportController'
    })
}]);
dashboardApp.controller('insertController', ['$scope', '$http', function ($scope, $http) {
    $scope.$watch('title', function (newVal, oldVal, scope) {
        console.log('new:' + newVal);
        console.log('old' + oldVal);
    })
    $scope.clickPost = function () {
        var post_data = {
            'title': $scope.title,
            'author': $scope.author,
            'category': $scope.category,
            'content': $scope.content
        }
        var req = {
            method: 'POST',
            url: 'http://localhost:8080/backend/post/insert',
            headers: {
                'Content-Type': 'application/json'
            },
            data: post_data
        }
        $http(req).then(function (response) {
            console.log(response);
        });
    }
}])
dashboardApp.controller('reportController', ['$scope', '$http', function ($scope, $http) {
    $scope.content = [];
    $scope.totalPerPriceNoTax = 0;
    $http({
        method: 'GET',
        url: 'http://localhost:8080/backend/data/all'
    }).then(function (response) {
        console.log(response);
        $scope.content = response.data;
        var total = 0.0;
        $scope.totalPerAmountNoTax = 0;
        $scope.totalTax = 0;
        $scope.totalTotalTax = 0;
        for (var i in $scope.content) {
            //console.log($scope.content[i].priceNotax);
            //不含税单价
            var perPrice = parseFloat($scope.content[i].priceNotax.replace(',', '').replace('-', 0));
            //不含税金额
            //console.log($scope.content[i].amoutNoTax)
            var perAmount = parseFloat($scope.content[i].amoutNoTax.replace(',', '').replace('-', 0));
            //税额
            var perTax = parseFloat($scope.content[i].tax.replace(',', '').replace('-', 0));
            //价税统计
            var perTotal = parseFloat($scope.content[i].total.replace(',', '').replace('-', 0));
            //console.log(parseFloat(per))
            //console.log(perAmount)
            if (!isNaN(perPrice)) {
                $scope.totalPerPriceNoTax += perPrice;
            }
            if (!isNaN(perAmount)) {
                $scope.totalPerAmountNoTax += perAmount;
            }
            if (!isNaN(perTax)) {
                $scope.totalTax += perTax;
            }
            if (!isNaN(perTotal)) {
                $scope.totalTotalTax += perTotal;
            }
        }
        //$scope.totalPerPriceNoTax = total;
        //console.log($scope.totalPerPriceNoTax);
        //console.log($scope.totalPerAmountNoTax);
    });
    $scope.$watch('content', function (newVal, oldVal) {
        //console.log('new:' + newVal);
        //console.log('old:' + oldVal);
    })

    $scope.result = {
        mCategory: [],
        mName: [],
        size: [],
        param: [],
        factory: []
    }

    $http({
        method: 'GET',
        url: 'http://localhost:8080/backend/data/info'
    }).then(function (response) {
        console.log(response);
        var data = response.data;
        console.log(data);
        $scope.mCategory = data.mCategory;
        $scope.mName = data.mName;
        $scope.size = data.size;
        $scope.param = data.param;
        $scope.factory = data.factory;

        $scope.result.mCategory = data.mCategory;
        $scope.result.mName = data.mName;
        $scope.result.size = data.size;
        $scope.result.param = data.param;
        $scope.result.factory = data.factory;

    });



    //$scope.mCategory = '';
    //    $scope.mCategory = ['Mustard', 'Ketchup', 'Relish'];
    //    $scope.mName = [];
    //    $scope.size = [];
    //    $scope.param = [];
    //    $scope.factory = [];

    $scope.dateOpts = {
        locale: {
            applyClass: 'btn-green',
            applyLabel: "确定",
            fromLabel: "起",
            toLabel: "止",
            cancelLabel: '取消',
            customRangeLabel: '自定义起止日期',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            firstDay: 1,
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
                '十月', '十一月', '十二月'
            ]
        },
        ranges: {
            '过去一周': [moment().subtract(6, 'days'), moment()],
            '过去三十天': [moment().subtract(29, 'days'), moment()],
            '过去九十天': [moment().subtract(89, 'days'), moment()]
        }
    };



    $scope.result = {
        mCategory: [],
        mName: [],
        size: [],
        param: [],
        factory: [],
        date: []
    }

    $scope.result.date = {
        startDate: moment().subtract(7, "days"),
        endDate: moment()
    }

    $scope.apply = function () {
        // console.log($scope.result.date.startDate.format('YYYY-MM-DD'));
        //console.log($scope.result.mCategory.toString());


        console.log(encodeURI($scope.result.size.toString()));
        //
        for (var i in $scope.result.size) {
            //            //console.log($scope.result.size[i]);
            $scope.result.size[i] = $scope.result.size[i].replace(' ', '^');
            //            if ($scope.result.size[i].indexOf('，')) {
            console.log($scope.result.size[i]);
            //            }
            //            $scope.result.size[i] = $scope.result.size[i].replace('，', '^');
            //            //console.log($scope.result.size[i]);
        }

        var request = {
            'from': $scope.result.date.startDate.format('YYYY-MM-DD'),
            'end': $scope.result.date.endDate.format('YYYY-MM-DD'),
            'mCategory': $scope.result.mCategory.toString(),
            'mName': $scope.result.mName.toString(),
            'size': encodeURI($scope.result.size.join('&')),
            "param": $scope.result.param.toString(),
            'factory': $scope.result.factory.toString(),
        };

        console.log(request);
        $http({
            method: 'Post',
            url: 'http://localhost:8080/backend/data/get',
            headers: {
                'Content-Type': 'application/json'
            },
            data: request
        }).then(function (response) {
            console.log(response);
            $scope.content = response.data;
        });


    }





            }]);

function parseDouble() {}