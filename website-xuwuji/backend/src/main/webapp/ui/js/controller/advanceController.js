dataApp.controller('advanceController', [
		'$scope',
		'$http',
		function($scope, $http) {
			$scope.chartConfig = {
				options : {
					// This is the Main Highcharts chart config. Any Highchart
					// options are valid here.
					// will be overriden by values specified below.
					chart : {
						type : 'bar'
					},
					tooltip : {
						style : {
							padding : 10,
							fontWeight : 'bold'
						}
					}
				}, // The below properties are watched separately for changes.
				// Series object (optional) - a list of series using normal
				// Highcharts series options.
				series : [ {
					data : [ 10, 15, 12, 8, 7 ]
				} ], // Title configuration (optional)
				title : {
					text : '购入数'
				}, // Boolean to control showing loading status on chart
				// (optional)
				// Could be a string if you want to show specific loading text.
				loading : false, // Configuration for the xAxis (optional).
				// Currently only one x axis can be
				// dynamically controlled.
				// properties currentMin and currentMax provided 2-way binding
				// to the chart's maximum and minimum
				xAxis : {
					currentMin : 0,
					currentMax : 20,
					title : {
						text : 'values'
					}
				}, // Whether to use Highstocks instead of Highcharts
				// (optional). Defaults to false.
				useHighStocks : false, // size (optional) if left out the chart
				// will default to size of the div or
				// something sensible.
				size : {
					width : 400,
					height : 300
				}, // function (optional)
				func : function(chart) {
					// setup some logic for the chart
				}
			};
			$scope.chartConfig1 = {
				"options" : {
					"chart" : {
						"type" : "areaspline"
					},
					"plotOptions" : {
						"series" : {
							"stacking" : ""
						}
					}
				},
				"series" : [ {
					"name" : "YA板材",
					"data" : [ 1, 2, 4, 7, 3 ],
					"id" : "series-0"
				}, {
					"name" : "YC封边条",
					"data" : [ 3, 1, null, 5, 2 ],
					"connectNulls" : true,
					"id" : "series-1"
				}, {
					"name" : "发出数量",
					"data" : [ 5, 2, 2, 3, 5 ],
					"type" : "column",
					"id" : "series-2"
				}, {
					"name" : "购入数量",
					"data" : [ 1, 1, 2, 3, 2 ],
					"type" : "column",
					"id" : "series-3"
				} ],
				"title" : {
					"text" : "价税统计"
				},
				"credits" : {
					"enabled" : true
				},
				"loading" : false,
				"size" : {}
			};
			$scope.chartConfig2 = {
				options : {
					chart : {
						zoomType : 'x'
					},
					rangeSelector : {
						enabled : true
					},
					navigator : {
						enabled : true
					}
				},
				series : [],
				title : {
					text : '订单量'
				},
				useHighStocks : true
			}
			$scope.chartConfig2.series.push({
				id : 1,
				data : [ [ 1147651200000, 23.15 ], [ 1147737600000, 23.01 ],
						[ 1147824000000, 22.73 ], [ 1147910400000, 22.83 ],
						[ 1147996800000, 22.56 ], [ 1148256000000, 22.88 ],
						[ 1148342400000, 22.79 ], [ 1148428800000, 23.50 ],
						[ 1148515200000, 23.74 ], [ 1148601600000, 23.72 ],
						[ 1148947200000, 23.15 ], [ 1149033600000, 22.65 ] ]
			}, {
				id : 2,
				data : [ [ 1147651200000, 25.15 ], [ 1147737600000, 25.01 ],
						[ 1147824000000, 25.73 ], [ 1147910400000, 25.83 ],
						[ 1147996800000, 25.56 ], [ 1148256000000, 25.88 ],
						[ 1148342400000, 25.79 ], [ 1148428800000, 25.50 ],
						[ 1148515200000, 26.74 ], [ 1148601600000, 26.72 ],
						[ 1148947200000, 26.15 ], [ 1149033600000, 26.65 ] ]
			});
			$scope.chartConfig3 = {
				"options" : {
					chart : {
						plotBackgroundColor : null,
						plotBorderWidth : null,
						plotShadow : false,
						type : 'pie'
					}
				},
				"series" : [ {
					name : 'Brands',
					colorByPoint : true,
					data : [ {
						name : '俊安（广州泰康）',
						y : 56.33
					}, {
						name : '天元（东莞希尔顿）',
						y : 24.03,
						sliced : true,
						selected : true
					}, {
						name : '宁鹏（GRG义乌世贸中心）',
						y : 10.38
					}, {
						name : '欣荣星（惠州龙门）',
						y : 4.77
					}, {
						name : '欣荣星（四川自贡）',
						y : 0.91
					}, {
						name : '永昌盛（广州泰康）',
						y : 0.2
					} ]
				} ],
				"title" : {
					"text" : "厂商占有率"
				},
				"credits" : {
					"enabled" : true
				},
				"loading" : false,
				"size" : {}
			};
		} ])