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
				'updateController',
				[
						'$scope',
						'$http',
						'dataService',
						'$modalInstance',
						'selectedData',
						'$window',
						function($scope, $http, dataService, $modalInstance,
								selectedData, $window) {
							$http
									.get(
											'/backend/data/get/id/'
													+ selectedData.id)
									.then(function(response) {
										console.log(response);
										var data = response.data;
										console.log(data);
										$scope.mId = data.mId;
										$scope.mCategory = data.mCategory;
										$scope.mName = data.mName;
										$scope.size = data.size;
										$scope.param = data.param;
										$scope.buyNum = data.buyNum;
										$scope.sentNum = data.sentNum;
										$scope.nId = data.nId;
										$scope.orderId = data.orderId;
										$scope.factory = data.factory;
										$scope.amoutNoTax = data.amoutNoTax;
										$scope.priceNoTax = data.priceNoTax;
										$scope.taxRate = data.taxRate;
										$scope.tax = data.tax;
										$scope.total = data.total;
										// $scope.date = data.date;
									});

							$scope.confirm = function() {
								// $scope.tax = $scope.amoutNoTax *
								// $scope.taxRate;
								// $scope.total = $scope.amoutNoTax
								// * (($scope.taxRate - 0) + 1);
								var post_data = {
									'id' : selectedData.id,
									// 'date' : $scope.date,
									'mId' : $scope.mId,
									'mCategory' : $scope.mCategory,
									'mName' : $scope.mName,
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
									'factory' : $scope.factory,
								// 'requestDate' : $scope.requestDate,
								}
								$scope.error = false;
								console.log(post_data);
								$http
										.post('/backend/data/update', post_data)
										.then(
												function(response) {
													console.log(response);
													if (response.data.code != 0) {
														$scope.error = true;
														$scope.errorMessage = response.data.error_message;
														$scope.detailErrorMessage = response.data.resp;
														alert("输入有误");
														// $scope.tax =
														// $scope.amoutNoTax
														// * $scope.taxRate;
														// $scope.total =
														// $scope.amoutNoTax
													} else {
														$scope.error = false;
														alert("修改成功");
														$modalInstance
																.dismiss('cancel');
														$window.location
																.reload();
													}
												});
							};

							$scope.cancel = function() {
								$modalInstance.dismiss('cancel');
							};
						} ]);