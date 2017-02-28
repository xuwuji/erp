dataApp
		.controller(
				'advanceController',
				[
						'$scope',
						'$http',
						function($scope, $http) {

							$scope.dateOpts = {
								locale : {
									applyClass : 'btn-green',
									applyLabel : "确定",
									fromLabel : "起",
									toLabel : "止",
									cancelLabel : '取消',
									customRangeLabel : '自定义起止日期',
									daysOfWeek : [ '日', '一', '二', '三', '四',
											'五', '六' ],
									firstDay : 1,
									monthNames : [ '一月', '二月', '三月', '四月',
											'五月', '六月', '七月', '八月', '九月', '十月',
											'十一月', '十二月' ]
								},
								ranges : {
									'过去一周' : [ moment().subtract(6, 'days'),
											moment() ],
									'过去三十天' : [ moment().subtract(29, 'days'),
											moment() ],
									'过去九十天' : [ moment().subtract(89, 'days'),
											moment() ]
								}
							};

							$scope.chartOneDate = {
								startDate : moment().subtract(364, "days"),
								endDate : moment()
							}

							$scope.chartConfig1 = {
								options : {
									// This is the Main Highcharts chart config.
									// Any
									// Highchart
									// options are valid here.
									// will be overriden by values specified
									// below.
									chart : {
										type : 'column'
									},
									tooltip : {
										style : {
											padding : 10,
											fontWeight : 'bold'
										}
									},
									plotOptions : {
										column : {
											dataLabels : {
												enabled : true
											},
											enableMouseTracking : false
										}
									}
								},
								// The below properties are watched
								// separately for
								// changes.
								// Series object (optional) - a list of series
								// using
								// normal
								// Highcharts series options.
								series : [], // Title configuration
								// (optional)
								title : {
									text : '材料购入数量'
								}, // Boolean to control showing loading status
								// on
								// chart
								// (optional)
								// Could be a string if you want to show
								// specific
								// loading text.
								loading : false, // Configuration for the
								// xAxis
								// (optional).
								// Currently only one x axis can be
								// dynamically controlled.
								// properties currentMin and currentMax provided
								// 2-way
								// binding
								// to the chart's maximum and minimum
								xAxis : {
									categories : [],
									title : {
										text : '材料名称'
									}
								},
								credits : {
									enabled : false
								},// Whether to use Highstocks instead of
								// Highcharts
								// (optional). Defaults to false.
								useHighStocks : false, // size (optional) if
								// left out
								// the chart
								// will default to size of the div or
								// something sensible.
								size : {
									width : 1000,
									height : 500
								}, // function (optional)
								func : function(chart) {
									// setup some logic for the chart
								}
							};

							$scope.chartOneClick = function() {
								var request = {
									'from' : $scope.chartOneDate.startDate
											.format('YYYY-MM-DD'),
									'end' : $scope.chartOneDate.endDate
											.format('YYYY-MM-DD')
								};
								var url = "/backend/advance/SumByMCategoryAndMonth?startDate="
										+ request.from
										+ "&endDate="
										+ request.end;
								$http
										.get(url)
										.then(
												function(response) {
													for ( var key in response.data) {
														var record = {}
														record.name = key;
														record.data = [];
														record.data
																.push(response.data[key]);
														$scope.chartConfig1.series
																.push(record);
														$scope.chartConfig1.xAxis.categories
																.push(key);
													}
												});
							}

							$scope.chartConfig2 = {
								"options" : {
									"chart" : {
										"type" : "column"
									},
									plotOptions : {
										column : {
											dataLabels : {
												enabled : true
											},
											enableMouseTracking : false
										}
									}
								},
								xAxis : {
									categories : [],
								},
								"series" : [ {
									"name" : "发出数量",
									"data" : [],
									"type" : "column",
									"id" : "series-2"
								}, {
									"name" : "购入数量",
									"data" : [],
									"type" : "column",
									"id" : "series-3"
								} ],
								"title" : {
									"text" : "每月发出总量与购入总量"
								},
								"credits" : {
									"enabled" : true
								},
								"loading" : false,
								"size" : {}
							};

							var chartTwoApply = function() {
								var url = "/backend/advance/NumVsMonth"
								$http
										.get(url)
										.then(
												function(response) {
													var result = response.data;
													var sentNum = result.sentNum;
													var buyNum = result.buyNum;
													console.log(sentNum);
													console.log(buyNum);
													for ( var key in sentNum) {
														$scope.chartConfig2.series[0].data
																.push(sentNum[key]);
														$scope.chartConfig2.xAxis.categories
																.push(key);
													}
													for ( var key in buyNum) {
														$scope.chartConfig2.series[1].data
																.push(buyNum[key]);
													}
												});
							}
							chartTwoApply();

							$scope.chartConfig3 = {
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
									text : '每月发出总量与购入总量'
								},
								useHighStocks : true
							}
							$scope.chartConfig3.series.push({
								id : 1,
								data : [ [ 1147651200000, 23.15 ],
										[ 1147737600000, 23.01 ],
										[ 1147824000000, 22.73 ],
										[ 1147910400000, 22.83 ],
										[ 1147996800000, 22.56 ],
										[ 1148256000000, 22.88 ],
										[ 1148342400000, 22.79 ],
										[ 1148428800000, 23.50 ],
										[ 1148515200000, 23.74 ],
										[ 1148601600000, 23.72 ],
										[ 1148947200000, 23.15 ],
										[ 1149033600000, 22.65 ] ]
							}, {
								id : 2,
								data : [ [ 1147651200000, 25.15 ],
										[ 1147737600000, 25.01 ],
										[ 1147824000000, 25.73 ],
										[ 1147910400000, 25.83 ],
										[ 1147996800000, 25.56 ],
										[ 1148256000000, 25.88 ],
										[ 1148342400000, 25.79 ],
										[ 1148428800000, 25.50 ],
										[ 1148515200000, 26.74 ],
										[ 1148601600000, 26.72 ],
										[ 1148947200000, 26.15 ],
										[ 1149033600000, 26.65 ] ]
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