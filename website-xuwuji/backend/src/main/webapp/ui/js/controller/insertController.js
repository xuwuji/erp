dataApp.controller('insertController', [
		'$scope',
		'$http',
		'dataService',
		function($scope, $http, dataService) {
			$scope.date = new Date();
			$scope.requestDate = new Date();
			$scope.factories = [];
			$scope.mCategories = [];
			$scope.mNames = [];

			// Load all info for initial input
			dataService.loadInfo().then(function(response) {
				// console.log(info);
				$scope.factories = [].concat(response.data.factory);
				$scope.mCategories = [].concat(response.data.mCategory);
				$scope.mNames = [].concat(response.data.mName);
			});
			// console.log(this.info);

			// 检查材料编号，如果以前录入过，则把其他信息补全
			$scope.check = function(mId) {
				$http.get('/backend/data/check?mId=' + mId).then(
						function(response) {
							console.log(response);
							var record = response.data;
							if (record == "" || record === "" || record == null
									|| record == undefined) {
								alert("未输入过此单号");
							} else {
								$scope.mId = record.mId;
								$scope.mCategoryInput = record.mCategory;
								$scope.mNameInput = record.mName;
								$scope.size = record.size;
								$scope.param = record.param;
							}
						});
			}

			// 录入信息
			$scope.clickPost = function(scope) {
				// console.log($scope.factoryInput);
				// console.log($scope.mCategoryInput);
				// console.log($scope.mNameInput);
				// $scope.tax = $scope.amoutNoTax * $scope.taxRate;
				// $scope.total = $scope.amoutNoTax * (($scope.taxRate - 0) +
				// 1);

				$scope.priceNoTax = $scope.total / (($scope.taxRate - 0) + 1);
				$scope.tax = $scope.total / ((($scope.taxRate - 0) + 1))
						* ($scope.taxRate - 0);
				$scope.amoutNoTax = ($scope.total / (($scope.taxRate - 0) + 1))
						* $scope.buyNum;
				var post_data = {
					'date' : $scope.date,
					'mId' : $scope.mId,
					'mCategory' : $scope.mCategoryInput,
					'mName' : $scope.mNameInput,
					'size' : $scope.size,
					'param' : $scope.param,
					'buyNum' : $scope.buyNum,
					'sentNum' : $scope.sentNum,
					'inventory' : $scope.inventory,
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