/*
サンドボックスパターン
main.startupから始まる
---------------------
main
2015/8/29 ver1.00
*/
(function() {
    "use strict";
    var Main = function() {

    };
    Main.prototype = {
        handleEvent:function(evt){
            switch (evt.type) {
                case "scriptsLoaded":
                    console.log(evt.type);
                    console.log("すべてのスクリプトが読み込み完了した");
                    var _ = Eldra; //名前空間を変数に代入しておく。（未定義エラーの回避）
                    var test1 = new _.Test1();
                    console.log(test1.get());

                    break;
                default:

            }
        },
        startup: function() {
            //ここに記述
            this.include(["test1.js","test2.js"],this);
        },
        parseDom: function(text) {
            var dom = document.createElement('dom');
            dom.innerHTML = text;
            return dom;
        },
        dispatchEvent: function(newtype, targetElement) {
            var evt = document.createEvent("Event");
            evt.initEvent(newtype, true, true);
            targetElement.addEventListener(newtype, this, false);
            targetElement.dispatchEvent(evt);
        },
        include:function(list,caller){
            var counter = 0;
            var callback = function(evt){
                console.log(evt.target);
                counter++;
                if(list.length===counter){
                    //今回targetElementは利用しないのでdocumentとしておく。
                    caller.dispatchEvent("scriptsLoaded",document);
                }
            };
            for(var i=0;i<list.length;i++){
                var s = document.getElementsByTagName("script")[0];
                var script = document.createElement('script');
                script.src = list[i];
                script.addEventListener('load',callback,false);
                s.parentNode.insertBefore(script, s);
            }
        }
    };

    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function() {
            new Main().startup();
        }, false);
    }
}());
