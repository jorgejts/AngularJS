angular.module('war-panels', [ ])

	.directive('warPanels', [function (){
		return {
			restrict: 'E',
			templateUrl: './templates/war-panels.html',
			controller: function($scope,$rootScope){
				this.tab=1;
				$rootScope.finalWidth=document.getElementById('customizePicture').offsetWidth;
				var btns=document.getElementsByClassName('btn');
				
				Caman("#picture", $rootScope.file64, function () {
				  this.brightness(0).render();
				});

				this.selectTab=function(setTab){
					this.tab=setTab;
				};

				this.isSelected=function(checkTab){
					return this.tab===checkTab;
				};
				
				$scope.customize=function(brightness,saturation,exposure,gamma,clip,stackBlur,contrast,vibrance,hue,sepia,noise,sharpen,age){
					Caman("#picture", function () {
					   this.initCanvas();
					});
					Caman("#picture", function () {
					  this.brightness(brightness);
					  this.saturation(saturation);
					  this.exposure(exposure);
					  //this.gamma(gamma);
					  this.clip(clip);
					  this.stackBlur(stackBlur);
					  this.contrast(contrast);
					  this.vibrance(vibrance);
					  this.hue(hue);
					  this.sepia(sepia);
					  this.noise(noise);
					  this.sharpen(sharpen);
					  this.render();
					});
					$rootScope.age=age;
					document.getElementById('save').disabled=false;
				};
				Caman.Event.listen("renderStart", function (job) {
				  angular.forEach(btns,function(btn,key){
				  	btn.disabled=true;
				  	btn.value='Wait...';
				  });
				});
				Caman.Event.listen("renderFinished", function (job) {
				  angular.forEach(btns,function(btn,key){
				  	btn.disabled=false;
				  	btn.value=btn.name;
				  });
				});
			},
			controllerAs:'panel',
		};
	}])