// App Main

var bits = function() {};
bits.search = function() {};

//Constructor
bits.search.appMain = function() {
  alert('app');
  bits.search.appMain.registerSearchProvider();
  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.message == 'send array') {
      console.log('recieved sent message from dom');
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'sent data', data: searchProviders[0] }, function(response) {});
      });
    }
  });
};

//This array holds all of the search providers or data sources
searchProviders = [];

//Finds all the search providers
bits.search.appMain.registerSearchProvider = function() {
  var uom = new bits.search.uomFile();

  var cx = new bits.search.cxFile();

  searchProviders[0] = {
    provider: uom,
    data: null
  };
  searchProviders[1] = {
    provider: cx,
    data: null
  };

  bits.search.appMain.querySearchProviders('/data/uomData.json', '/data/cxData.json');
};

//bits.search.appMain.initSearchProviders = function() {};

bits.search.appMain.querySearchProviders = function(uomFile, cxFile) {
  searchProviders[0].data = searchProviders[0].provider.query(uomFile);
  searchProviders[1].data = searchProviders[1].provider.query(cxFile);
};

bits.search.appMain.applySearchResults = function(searchResult) {
  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.message == 'send array') {
      console.log('recieved sent message from dom');
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'sent data', data: sendResult }, function(response) {});
      });
    }
  });
};
