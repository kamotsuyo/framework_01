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
        handleEvent:function(ev){

        },
        startup: function() {
            //ここに記述

        },
        parseDom: function(text) {
            var dom = document.createElement('dom');
            dom.innerHTML = text;
            return dom;
        },
        dispatchEvent: function(newtype, targetElement) {
            var ev = document.createEvent("Event");
            ev.initEvent(newtype, true, true);
            targetElement.addEventListener(newtype, this, false);
            targetElement.dispatchEvent(ev);
        }
    };

    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function() {
            new Main().startup();
        }, false);
    }
}());
