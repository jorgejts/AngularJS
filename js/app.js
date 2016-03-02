(function(){	
	angular.module('aplication', ['ngRoute','war-panels' ])
	
	.controller('HomeCtrl', ['$rootScope','$scope','$location', function ($rootScope,$scope,$location) 
	{
		$scope.uploadFile = function()
		{
			$rootScope.name=$scope.file.name;
			var output = document.getElementById('output');
			$rootScope.imgWidth=output.width;
			var file64 = $rootScope.file64;
			$location.path('/customize/');
		

		}
	}])


	.directive('uploaderModel', ["$parse","$rootScope", function ($parse,$rootScope) {
		return {
			restrict: 'A',
			link: function (scope, iElement, iAttrs) 
			{
				iElement.on("change", function(e)
				{
					var file=$parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
					var output = document.getElementById('output');
					if(file.size>500000){
						alert("This image is too big. Please, it should be less than 500kb.");
						output.src = './images/warning.png';
					}else{
						var ext=file.type;
						if(ext.match(/(jpeg|jpg|gif|png)$/)){
							var reader = new FileReader();
							reader.onload = function(){
						      var file64=reader.result;
						      output.src = file64;
						      $rootScope.file64=file64;

						    };
							reader.readAsDataURL(file);
						}else{
							alert("This file is not an image.");
							output.src = './images/warning.png';
						}
						
					}
				});
			}
		};
	}])


//---------------------Directiva para guardar la imagen tuneada----------------------

.directive('saveAndMore', ["$parse","$location",'serverPicture',"$rootScope", function ($parse,$location,serverPicture,$rootScope) {
		return {
			restrict: 'A',
			link: function (scope, iElement, iAttrs) 
			{
				iElement.on("click", function(e)
				{
					Caman("#picture", function () {
						this.brightness(0);
						this.render(function () {
						  	var img64=this.toBase64();
						  	var file= img64.split(',')[1];
						  	$location.path('/waiting/');
						  	serverPicture.uploadFile(file,$rootScope.name,$rootScope.age)
						  	.then(function(fileName){
						  		if(fileName.match(/^(WWI|WWII|Korea|NAM)[0-9]{2}/)){
									var a = window.document.createElement('a');
									a.href = "./uploads/"+fileName;
									a.download = fileName;
									// Append anchor to body.
									document.body.appendChild(a);
									a.click();

									// Remove anchor from body
									document.body.removeChild(a);
									return fileName;
								}else{
									$location.path('/fail/');
									setTimeout(function() {
										return fileName;
									},5000);
								}
							})
							.then(function(fileName){
								setTimeout(function() {
									serverPicture.deleteFile(fileName);
									$location.path('/');
								}, 5000);
							})
					    });
					});
				});
			}
		};
	}])


	

	.service('serverPicture', ["$http", "$q",function ($http, $q,$rootScope) 
	{
		this.uploadFile = function(data,name,age)
		{	
			var deferred = $q.defer();
			var promise=deferred.promise;
			$http.post("createPicture.php", 
				{
					data:data,
					name:name,
					age:age
				})
			.success(function(res)
			{
				deferred.resolve(res);
			})
			.error(function(msg, code)
			{
				deferred.reject(msg);
			})
			return promise;
		}	

		this.deleteFile=function(name)
		{
			var deferred = $q.defer();
			var promise=deferred.promise;
			$http.post("deletePicture.php", 
				{
					name:name
				})
			.success(function(res)
			{
				deferred.resolve(res);
			})
			.error(function(msg, code)
			{
				deferred.reject(msg);
			})
			return promise;
		}
	}])




})();