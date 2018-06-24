var app=angular.module('myApp',['ui.router']);
const {clipboard,nativeImage} = require('electron')
//electron-clipboard-watcher

app.config(['$stateProvider',function($stateProvider){

    $stateProvider
    .state('copy',{
      url:'/copy',
      templateUrl:'copy.html',
      controller:'copyCtrl'
    })
    .state('paste',{
        url:'/paste',
        templateUrl:'paste.html',
        controller:'pasteCtrl'
      })
   
  
  }]);

app.controller('copyCtrl',function($scope){

    
    $scope.doCopyText=function(){
        clipboard.writeText($scope.text, 'selection')
        
    }
    
    $scope.doCopyHTML=function(){
        clipboard.writeHtml($scope.html, 'selectionHTML')
        
    }

    $scope.doBookmark=function(){
        clipboard.writeBookmark($scope.title, $scope.url)
        
        
    }

    $scope.doCopyImage=function(){
        
        $scope.selectedFile = document.getElementById('file-copy2').files[0];
        $scope.path=$scope.selectedFile.path;
        clipboard.writeImage(nativeImage.createFromPath($scope.path));
    }

});

app.controller('pasteCtrl',function($scope){

    
    $scope.doPasteText=function(){
        
       $scope.text=clipboard.readText('selection')
       $scope.showtext=true;
        
    }
   
    $scope.doPasteHTML=function(){
        let p=document.getElementById('p');
        p.innerHTML=clipboard.readHtml('selectionHTML')
        
        $scope.showhtml=true;
        //alert(window.getSelection().toString())
        
        
    }
    $scope.doPasteBookmark=function(){
        let abookmark=document.getElementById('bookmark');
        let bookmark=clipboard.readBookmark();
        abookmark.innerHTML=bookmark.title;
        abookmark.href=bookmark.url;
        $scope.showbookmark=true;
        
    }

    $scope.doPasteImage=function(){
        let image=clipboard.readImage();
        $scope.path=image.toDataURL();
        $scope.showImg=true;

    }

})