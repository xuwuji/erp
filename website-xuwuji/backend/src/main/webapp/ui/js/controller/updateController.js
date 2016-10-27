dataApp.controller('updateController', [
		'$scope',
		'$http',
		'dataService',
		'$modalInstance',
		'selectedData',
		function($scope, $http, dataService, $modalInstance, selectedData) {
			dataService.getById('/backend/data/get/id' + selectedData.id).then(
					function(response) {
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
						$scope.taxRate = data.taxRate;
						$scope.tax = data.tax;
						$scope.total = data.total;
					});

			dataService.loadInfo().then(function(response) {
				$scope.date = new Date();
				$scope.requestDate = new Date();
				$scope.factories = [];
				$scope.mCategories = [];
				$scope.mNames = [];
				$scope.factories = [].concat(response.data.factory);
				$scope.mCategories = [].concat(response.data.mCategory);
				$scope.mNames = [].concat(response.data.mName);
			});

			$scope.confirm = function() {
				$scope.tax = $scope.amoutNoTax * $scope.taxRate;
				$scope.total = $scope.amoutNoTax * (($scope.taxRate - 0) + 1);
				var post_data = {
					'id' : selectedData.id,
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

				console.log(post_data);
				dataService.updateRecord('/backend/data/update', post_data)
						.then(function(response) {
							console.log(response);
							if (response.data.code != 0) {
								alert("输入有误，请检查后重新输入");
							} else {
								alert("录入成功");
							}
						});
			};

			$scope.cancel = function() {
				$modalInstance.dismiss('cancel');
			};
		} ]);