dataApp
		.controller(
				'reportController',
				[
						'$scope',
						'$http',
						'dataService',
						'authService',
						'$timeout',
						'$modal',
						'$window',
						function($scope, $http, dataService, authService,
								$timeout, $modal, $window) {

							// this.$modal = $modal;

							if (authService.isSuper()) {
								$scope.superUser = true;
							} else {
								$scope.superUser = false;
							}
							//$scope.loading = true;
							//$scope.show = false;
							//现在是打开界面后默认什么都不选，不显示全部
							$scope.loading = false;
							$scope.show = true;
							$scope.content = [];
							$scope.totalPerPriceNoTax = 0;

							function getAll() {
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
													// $scope.totalPerPriceNoTax
													// =
													// total;
													// console.log($scope.totalPerPriceNoTax);
													// console.log($scope.totalPerAmountNoTax);
												});
							}

							//getAll();

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
								for ( var i in $scope.result.size) {
									// //console.log($scope.result.size[i]);
									$scope.result.size[i] = $scope.result.size[i]
											.replace(' ', '^');
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

							$scope.deleteRecord = function(id) {
								var deleted = $window.confirm('确认要删除此条数据吗?');
								if (deleted) {
									//$window.alert('Going to delete the user');
									$http.get('/backend/data/delete/' + id)
											.then(function(response) {
												$scope.apply();
											});
								}
							}

							$scope.updateRecord = function(id) {
								$modal
										.open({
											templateUrl : '/backend/ui/html/dashboard/template/update.html',
											controller : 'updateController',
											controllerAs : 'ctrl',
											windowClass : 'app-modal-window-managementPannel',
											resolve : {
												selectedData : function() {
													return {
														id : id
													};
												}
											}
										});
							}
						} ]);