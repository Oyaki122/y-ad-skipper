// ==UserScript==
// @name         Youtube Ad Auto Skipper
// @name:ja      Youtube広告自動スキップ
// @namespace    https://github.com/Oyaki122
// @version      3.01
// @description  Automatically click Ad Skip button on Youtube
// @description:ja  自動でYoutubeの広告のスキップボタンを押します
// @author       N.Y.Boyu and Oyaki122
// @match        https://www.youtube.com/*
// @exclude      https://www.youtube.com/live_chat?*
// @exclude      https://www.youtube.com/live_chat_replay?*
// @grant        none
// @license      MIT
// @downloadURL https://github.com/Oyaki122/y-ad-skipper/raw/main/y-ad-skipper.user.js
// @updateURL https://github.com/Oyaki122/y-ad-skipper/raw/main/y-ad-skipper.user.js
// ==/UserScript==


(function(){
    var MutationObserver=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;
    if(!MutationObserver){
        return console.error("YAS: Sorry, but this browser is NOT compatible with Youtube Ad Auto Skipper.");
    }
    try{if((window.self!==window.top)&&(document.URL.substring(23,30)!=="/embed/")){
        return console.log("YAS: This frame will not contain video...");
    }}catch(e){}
    console.log("YAS: Youtube Ad Auto Skipper is enabled.");
    Element.prototype._addEventListener = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function () {
        let args = [...arguments]
        if (args[0] != "click"){
          return this._addEventListener(...args);
        }

        let temp = args[1];
        args[1] = function () {
            let args2 = [...arguments];
            if(args2[0].type == null || args2[0].type != "click"){
              return temp(...args2);
            }
            // console.log(args2[0])
            // args2[0].preventDefault();
            let mev = args2[0]
            let newmev = {
              isTrusted: true,
              __composedPath: mev.__composedPath,
              __polymerGesturesHandled: mev.__polymerGesturesHandled,
              altKey: mev.altKey,
              altitudeAngle: mev.altitudeAngle,
              azimuthAngle: mev.azimuthAngle,
              bubbles: mev.bubbles,
              button: mev.button,
              buttons: mev.buttons,
              cancelBubble: mev.cancelBubble,
              cancelable: mev.cancelable,
              clientX: mev.clientX,
              clientY: mev.clientY,
              composed: mev.composed,
              ctrlKey: mev.ctrlKey,
              currentTarget: mev.currentTarget,
              defaultPrevented: mev.defaultPrevented,
              detail: mev.detail,
              eventPhase: mev.eventPhase,
              fromElement: mev.fromElement,
              height: mev.height,
              isPrimary: mev.isPrimary,
              layerX: mev.layerX,
              layerY: mev.layerY,
              metaKey: mev.metaKey,
              movementX: mev.movementX,
              movementY: mev.movementY,
              offsetX: mev.offsetX,
              offsetY: mev.offsetY,
              pageX: mev.pageX,
              pageY: mev.pageY,
              persistentDeviceId: mev.persistentDeviceId,
              pointerId: mev.pointerId,
              pointerType: mev.pointerType,
              pressure: mev.pressure,
              relatedTarget: mev.relatedTarget,
              returnValue: mev.returnValue,
              screenX: mev.screenX,
              screenY: mev.screenY,
              shiftKey: mev.shiftKey,
              sourceCapabilities: mev.sourceCapabilities,
              srcElement: mev.srcElement,
              tangentialPressure: mev.tangentialPressure,
              target: mev.target,
              tiltX: mev.tiltX,
              tiltY: mev.tiltY,
              timeStamp: mev.timeStamp,
              toElement: mev.toElement,
              twist: mev.twist,
              type: mev.type,
              view: mev.view,
              which: mev.which,
              width: mev.width,
              x: mev.x,
              y: mev.y,
            }
            newmev.preventDefault = () => args2[0].preventDefault.bind(this)
            newmev.stopPropagation = () => args2[0].stopPropagation.bind(this)
            // newmev.__proto__ = PointerEvent.prototype
            // console.log(typeof newmev.preventDefault)

            args2[0] = newmev
            // console.log(args2[0])

            return temp(...args2);
        }
        return this._addEventListener(...args, {passive: false});
    }

    var container;
    var check=function(){
        var button=container.getElementsByClassName("ytp-ad-skip-button")[0]||
                   container.getElementsByClassName("ytp-ad-skip-button-modern")[0]||
                   container.getElementsByClassName("ytp-skip-ad-button")[0]
        if(button){
            button.click();
            console.log("YAS: Skipped at "+new Date());
        }
    };
    var initObserver;
    var init=function(){
        if(container=document.getElementById("movie_player")){
            console.log("YAS: Video container detected.");
            initObserver.disconnect();
            new MutationObserver(check).observe(container,{childList:true,subtree:true});
            check();
        }
    };
    (initObserver=new MutationObserver(init)).observe(document.body,{childList:true,subtree:true});
    init();
})();
