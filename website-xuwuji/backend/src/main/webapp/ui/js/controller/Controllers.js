dataApp.controller('loginController', [ '$scope', 'userRole', '$location',
		'authService', '$rootScope',
		function($scope, userRole, $location, authService, $rootScope) {
			$scope.login = function(username, password) {
				if (username !== userRole.username) {
					var url = $location.path();
					$location.path(url);
					alert("帐号或密码错误");
				} else {
					if (password === userRole.normalUser.password) {
						var url = $location.path() + "dashboard";
						$location.path(url);
						authService.setNormal();
						$rootScope.logStatus = true;
					} else if (password === userRole.superUser.password) {
						var url = $location.path() + "dashboard";
						$location.path(url);
						authService.setSuper();
						$rootScope.logStatus = true;
					} else {
						var url = $location.path();
						$location.path(url);
						alert("帐号或密码错误");
					}
				}
			}
		} ])
dataApp
		.controller(
				'reportController',
				[
						'$scope',
						'$http',
						'dataService',
						'authService',
						'$timeout',
						function($scope, $http, dataService, authService,
								$timeout) {
							if (authService.isSuper()) {
								$scope.superUser = true;
							} else {
								$scope.superUser = false;
							}
							$scope.loading = true;
							$scope.show = false;
							$scope.content = [];
							$scope.totalPerPriceNoTax = 0;
							dataService
									.getAll()
									.then(
											function(response) {
												$scope.loading = false;
												$scope.show = true;
												console.log(response);
												$scope.content = response.data;
												var total = 0.0;
												$scope.totalPerAmountNoTax = 0;
												$scope.totalTax = 0;
												$scope.totalTotalTax = 0;
												$scope.totalBuyNum = 0;
												$scope.totalSentNum = 0;
												for ( var i in $scope.content) {
													// console.log($scope.content[i].priceNotax);
													// 不含税单价
													var perPrice = parseFloat($scope.content[i].priceNoTax
															.replace(',', '')
															.replace('-', 0));
													// 不含税金额
													// console.log($scope.content[i].amoutNoTax)
													var perAmount = parseFloat($scope.content[i].amoutNoTax
															.replace(',', '')
															.replace('-', 0));
													// 税额
													var perTax = parseFloat($scope.content[i].tax
															.replace(',', '')
															.replace('-', 0));
													// 价税统计
													var perTotal = parseFloat($scope.content[i].total
															.replace(',', '')
															.replace('-', 0));
													// 购入数
													var perBuyNum = parseInt($scope.content[i].buyNum);
													// 发出数量
													var perSentNum = $scope.content[i].sentNum
															.replace(',', '')
															.replace('-', 0);
													// console.log(parseFloat(per))
													// console.log(perSentNum)
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
													if (!isNaN(perBuyNum)) {
														$scope.totalBuyNum += perBuyNum;
													}
													if (!isNaN(perSentNum)) {
														$scope.totalSentNum += parseInt(perSentNum);
													}
												}
												$scope.totalLeftNum = $scope.totalBuyNum
														- $scope.totalSentNum;
												// $scope.totalPerPriceNoTax =
												// total;
												// console.log($scope.totalPerPriceNoTax);
												// console.log($scope.totalPerAmountNoTax);
											});
							$scope.$watch('content', function(newVal, oldVal) {
								// console.log('new:' + newVal);
								// console.log('old:' + oldVal);
							})
							$scope.result = {
								mId : [],
								mCategory : [],
								mName : [],
								size : [],
								param : [],
								factory : [],
								nId : [],
								orderId : []
							}
							dataService.loadInfo().then(function(response) {
								console.log(response);
								var data = response.data;
								console.log(data);
								$scope.mId = data.mId;
								$scope.mCategory = data.mCategory;
								$scope.mName = data.mName;
								$scope.size = data.size;
								$scope.param = data.param;
								$scope.nId = data.nId;
								$scope.orderId = data.orderId;
								$scope.factory = data.factory;
								$scope.result.mId = data.mId;
								$scope.result.mCategory = data.mCategory;
								$scope.result.mName = data.mName;
								$scope.result.size = data.size;
								$scope.result.param = data.param;
								$scope.result.factory = data.factory;
								$scope.result.nId = data.nId;
								$scope.result.orderId = data.orderId;
								// $scope.downloadUrl = 'from='
								// + $scope.result.date.startDate
								// .format('YYYY-MM-DD')
								// + '&end='
								// + $scope.result.date.endDate
								// .format('YYYY-MM-DD')
								// + '&mCategory='
								// + $scope.result.mCategory
								// .toString()
								// + '&mName='
								// + $scope.result.mName
								// .toString()
								// + '&param='
								// + $scope.result.param
								// .toString()
								// // + '&factory='
								// // + $scope.result.factory
								// // .toString()
								// + '&mId='
								// + $scope.result.mId
								// .toString()
								// + '&nId='
								// + $scope.result.nId
								// .toString()
								// + '&orderId='
								// + $scope.result.orderId
								// .toString();
							});
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
							$scope.result = {
								mId : [],
								mCategory : [],
								mName : [],
								size : [],
								param : [],
								factory : [],
								date : [],
								nId : []
							}
							$scope.result.date = {
								startDate : moment().subtract(7, "days"),
								endDate : moment()
							}
							$scope.prepareText = ''
							$scope.prepare = true;
							$scope.prepareOk = false;
							$scope.downloadText = "下载报表"
							$scope.download = function() {
								$scope.prepareText = '准备中'
								$scope.prepare = false;
								$scope.downloadText = "准备中"
								var request = {
									'from' : $scope.result.date.startDate
											.format('YYYY-MM-DD'),
									'end' : $scope.result.date.endDate
											.format('YYYY-MM-DD'),
									'mCategory' : $scope.result.mCategory
											.toString(),
									'mName' : $scope.result.mName.toString(),
									"param" : $scope.result.param.toString(),
									'factory' : $scope.result.factory
											.toString(),
									'mId' : $scope.result.mId.toString(),
									'nId' : $scope.result.nId.toString(),
									'orderId' : $scope.result.orderId
											.toString()
								};
								$scope.preparing = true;

								$http({
									method : 'POST',
									url : '/backend/data/download/prepare',
									headers : {
										'Content-Type' : 'application/json'
									},
									data : request
								}).then(function(response) {
									$scope.prepareText = ''
									console.log(response);
									$scope.preparing = false;
									$scope.prepareOk = true;
									$scope.downloadKey = response.data.resp;
								});
							}

							$scope.apply = function() {
								$scope.downloadText = "下载报表"
								$scope.loading = true;
								$scope.show = false;
								// console.log($scope.result.date.startDate.format('YYYY-MM-DD'));
								// console.log($scope.result.mCategory.toString());
								// console.log(encodeURI($scope.result.size.toString()));
								//
								for ( var i in $scope.result.size) {
									// //console.log($scope.result.size[i]);
									$scope.result.size[i] = $scope.result.size[i]
											.replace(' ', '^');
									// if ($scope.result.size[i].indexOf('，')) {
									// console.log($scope.result.size[i]);
									// }
									// $scope.result.size[i] =
									// $scope.result.size[i].replace('，', '^');
									// //console.log($scope.result.size[i]);
								}
								var request = {
									'from' : $scope.result.date.startDate
											.format('YYYY-MM-DD'),
									'end' : $scope.result.date.endDate
											.format('YYYY-MM-DD'),
									'mCategory' : $scope.result.mCategory
											.toString(),
									'mName' : $scope.result.mName.toString(),
									"param" : $scope.result.param.toString(),
									'factory' : $scope.result.factory
											.toString(),
									'mId' : $scope.result.mId.toString(),
									'nId' : $scope.result.nId.toString(),
									'orderId' : $scope.result.orderId
											.toString()
								};
								console.log(request);
								dataService
										.getData(request)
										.then(
												function(response) {
													$scope.prepare = true;
													$scope.preparing = false;
													$scope.prepareOk = false;
													$scope.downloadKey = '';
													console.log(response);
													$scope.loading = false;
													$scope.show = true;
													$scope.content = response.data;
													$scope.totalPerPriceNoTax = 0.0;
													$scope.totalPerAmountNoTax = 0.0;
													$scope.totalTax = 0.0;
													$scope.totalTotalTax = 0.0;
													$scope.totalBuyNum = 0;
													$scope.totalSentNum = 0;
													for ( var i in $scope.content) {
														// console.log($scope.content[i].priceNotax);
														// 不含税单价
														var perPrice = parseFloat($scope.content[i].priceNoTax
																.replace(',',
																		'')
																.replace('-', 0));
														// 不含税金额
														// console.log($scope.content[i].amoutNoTax)
														var perAmount = parseFloat($scope.content[i].amoutNoTax
																.replace(',',
																		'')
																.replace('-', 0));
														// 税额
														var perTax = parseFloat($scope.content[i].tax
																.replace(',',
																		'')
																.replace('-', 0));
														// 价税统计
														var perTotal = parseFloat($scope.content[i].total
																.replace(',',
																		'')
																.replace('-', 0));
														// 购入数
														var perBuyNum = parseInt($scope.content[i].buyNum);
														// 发出数量
														var perSentNum = $scope.content[i].sentNum
																.replace(',',
																		'')
																.replace('-', 0);
														// console.log(parseFloat(per))
														// console.log(perAmount)
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
														if (!isNaN(perBuyNum)) {
															$scope.totalBuyNum += perBuyNum;
														}
														if (!isNaN(perSentNum)) {
															$scope.totalSentNum += parseInt(perSentNum);
														}
													}
													$scope.totalLeftNum = $scope.totalBuyNum
															- $scope.totalSentNum;
												});
							}
						} ]);
dataApp.controller('insertController', [ '$scope', '$http', 'dataService',
		function($scope, $http, dataService) {
			$scope.$watch('date', function(newVal, oldVal, scope) {
				// console.log('new:' + newVal);
				// console.log('old' + oldVal);
			})
			$scope.date = new Date();
			$scope.requestDate = new Date();
			$scope.factories = [];
			$scope.mCategories = [];
			$scope.mNames = [];
			// this.info = angular.copy(info);
			// Load all info for initial input
			// infoService.loadAll().then(function (response) {
			// console.log(this.info);
			dataService.loadInfo().then(function(response) {
				// console.log(info);
				$scope.factories = [].concat(response.data.factory);
				$scope.mCategories = [].concat(response.data.mCategory);
				$scope.mNames = [].concat(response.data.mName);
			});
			// });
			// console.log(this.info);
			$scope.clickPost = function(scope) {
				// console.log($scope.factoryInput);
				// console.log($scope.mCategoryInput);
				// console.log($scope.mNameInput);
				$scope.tax = $scope.amoutNoTax * $scope.taxRate;
				$scope.total = $scope.amoutNoTax * (($scope.taxRate - 0) + 1);
				var post_data = {
					'date' : $scope.date,
					'mId' : $scope.mId,
					'mCategory' : $scope.mCategoryInput,
					'mName' : $scope.mNameInput,
					'size' : $scope.size,
					'param' : $scope.param,
					'buyNum' : $scope.buyNum,
					'sentNum' : $scope.sentNum,
					'nId' : $scope.nId,
					'orderId' : $scope.orderId,
					'priceNoTax' : $scope.priceNoTax,
					'amoutNoTax' : $scope.amoutNoTax,
					'taxRate' : $scope.taxRate,
					'tax' : $scope.tax,
					'total' : $scope.total,
					'factory' : $scope.factoryInput,
					'requestDate' : $scope.requestDate,
				}
				var req = {
					method : 'POST',
					url : '/backend/data/insert',
					headers : {
						'Content-Type' : 'application/json'
					},
					data : post_data
				}
				$http(req).then(function(response) {
					console.log(response);
					if (response.data.code != 0) {
						alert("输入有误，请检查后重新输入");
					} else {
						alert("录入成功");
					}
				});
			}
		} ])
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
					"name" : "俊安（广州泰康）",
					"data" : [ 5, 2, 2, 3, 5 ],
					"type" : "column",
					"id" : "series-2"
				}, {
					"name" : "天元（东莞希尔顿",
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