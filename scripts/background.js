chrome.action.onClicked.addListener(tab => { 


    chrome.cookies.getAll({domain: "https://steamcommunity.com/"}, function(cookies){
        console.log(cookies);
    });

    chrome.scripting
    .executeScript({
      target : {tabId : tab.id},
      files : [ "scripts/Third-Party/jquery-3.7.0.min.js","scripts/kluvo2.js" ],
    })
    .then(() => console.log("script injected"));

});