
var Module;
if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    }
    var PACKAGE_NAME = 'resources/hgimg4res.data';
    var REMOTE_PACKAGE_BASE = 'hgimg4res.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
    var REMOTE_PACKAGE_SIZE = 7059228;
    var PACKAGE_UUID = '4ccb9d8c-36d7-401c-9586-5ed26115f7a0';
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

function assert(check, msg) {
  if (!check) throw msg + new Error().stack;
}
Module['FS_createPath']('/', 'res', true, true);
Module['FS_createPath']('/res', 'shaders', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;
        Module['FS_createPreloadedFile'](this.name, null, byteArray, true, true, function() {
          Module['removeRunDependency']('fp ' + that.name);
        }, function() {
          if (that.audio) {
            Module['removeRunDependency']('fp ' + that.name); // workaround for chromium bug 124926 (still no audio with this, but at least we don't hang)
          } else {
            Module.printErr('Preloading file ' + that.name + ' failed');
          }
        }, false, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        this.requests[this.name] = null;
      },
    };
      new DataRequest(0, 7410, 0, 0).open('GET', '/res/chr.png');
    new DataRequest(7410, 245337, 0, 0).open('GET', '/res/body.png');
    new DataRequest(245337, 340941, 0, 0).open('GET', '/res/tamane2.gpb');
    new DataRequest(340941, 342330, 0, 0).open('GET', '/res/tamane2.material');
    new DataRequest(342330, 404726, 0, 0).open('GET', '/res/hsp3dish.png');
    new DataRequest(404726, 405834, 0, 0).open('GET', '/res/duck.material');
    new DataRequest(405834, 423047, 0, 0).open('GET', '/res/body_SD.png');
    new DataRequest(423047, 435425, 0, 0).open('GET', '/res/head_SD.png');
    new DataRequest(435425, 6027965, 0, 0).open('GET', '/res/sky.dds');
    new DataRequest(6027965, 6074088, 0, 0).open('GET', '/res/duck-diffuse.png');
    new DataRequest(6074088, 6207509, 0, 0).open('GET', '/res/font.gpb');
    new DataRequest(6207509, 6226409, 0, 0).open('GET', '/res/sky.gpb');
    new DataRequest(6226409, 6246244, 0, 0).open('GET', '/res/hsplogo8.png');
    new DataRequest(6246244, 6365171, 0, 0).open('GET', '/res/ball64.png');
    new DataRequest(6365171, 6467821, 0, 0).open('GET', '/res/duck.gpb');
    new DataRequest(6467821, 6782891, 0, 0).open('GET', '/res/tamane.gpb');
    new DataRequest(6782891, 6785005, 0, 0).open('GET', '/res/tamane.material');
    new DataRequest(6785005, 6962181, 0, 0).open('GET', '/res/head.png');
    new DataRequest(6962181, 6962753, 0, 0).open('GET', '/res/sky.material');
    new DataRequest(6962753, 6964863, 0, 0).open('GET', '/res/tamane.material~');
    new DataRequest(6964863, 6966549, 0, 0).open('GET', '/res/qbox.png');
    new DataRequest(6966549, 7001761, 0, 0).open('GET', '/res/btex.png');
    new DataRequest(7001761, 7004803, 0, 0).open('GET', '/res/shaders/colored.vert~');
    new DataRequest(7004803, 7006482, 0, 0).open('GET', '/res/shaders/colored-unlit.vert');
    new DataRequest(7006482, 7008227, 0, 0).open('GET', '/res/shaders/textured-unlit.vert');
    new DataRequest(7008227, 7010716, 0, 0).open('GET', '/res/shaders/textured.frag');
    new DataRequest(7010716, 7011035, 0, 0).open('GET', '/res/shaders/spritecol.vert');
    new DataRequest(7011035, 7014502, 0, 0).open('GET', '/res/shaders/textured.vert');
    new DataRequest(7014502, 7014902, 0, 0).open('GET', '/res/shaders/sprite.vert');
    new DataRequest(7014902, 7016505, 0, 0).open('GET', '/res/shaders/colored-unlit.vert~');
    new DataRequest(7016505, 7017898, 0, 0).open('GET', '/res/shaders/lighting.frag');
    new DataRequest(7017898, 7020368, 0, 0).open('GET', '/res/shaders/textured-bumped.frag');
    new DataRequest(7020368, 7020661, 0, 0).open('GET', '/res/shaders/form.vert');
    new DataRequest(7020661, 7020883, 0, 0).open('GET', '/res/shaders/form.frag');
    new DataRequest(7020883, 7022266, 0, 0).open('GET', '/res/shaders/lighting.frag~');
    new DataRequest(7022266, 7022536, 0, 0).open('GET', '/res/shaders/skinning-none.vert');
    new DataRequest(7022536, 7022804, 0, 0).open('GET', '/res/shaders/sprite.frag');
    new DataRequest(7022804, 7023930, 0, 0).open('GET', '/res/shaders/colored-unlit.frag');
    new DataRequest(7023930, 7024678, 0, 0).open('GET', '/res/shaders/lighting-directional.vert');
    new DataRequest(7024678, 7024925, 0, 0).open('GET', '/res/shaders/spritecol.vert~');
    new DataRequest(7024925, 7025253, 0, 0).open('GET', '/res/shaders/sprite.vert~');
    new DataRequest(7025253, 7027742, 0, 0).open('GET', '/res/shaders/textured.frag~');
    new DataRequest(7027742, 7029403, 0, 0).open('GET', '/res/shaders/lighting-point.vert');
    new DataRequest(7029403, 7030814, 0, 0).open('GET', '/res/shaders/terrain.vert');
    new DataRequest(7030814, 7033294, 0, 0).open('GET', '/res/shaders/terrain.frag');
    new DataRequest(7033294, 7034651, 0, 0).open('GET', '/res/shaders/textured-unlit.frag');
    new DataRequest(7034651, 7034938, 0, 0).open('GET', '/res/shaders/font.frag~');
    new DataRequest(7034938, 7035932, 0, 0).open('GET', '/res/shaders/lighting-directional.frag');
    new DataRequest(7035932, 7038537, 0, 0).open('GET', '/res/shaders/skinning.vert');
    new DataRequest(7038537, 7040919, 0, 0).open('GET', '/res/shaders/colored.frag');
    new DataRequest(7040919, 7042310, 0, 0).open('GET', '/res/shaders/lighting-point.frag');
    new DataRequest(7042310, 7046695, 0, 0).open('GET', '/res/shaders/textured-bumped.vert');
    new DataRequest(7046695, 7050086, 0, 0).open('GET', '/res/shaders/textured.vert~');
    new DataRequest(7050086, 7050374, 0, 0).open('GET', '/res/shaders/font.frag');
    new DataRequest(7050374, 7050703, 0, 0).open('GET', '/res/shaders/font.vert');
    new DataRequest(7050703, 7051695, 0, 0).open('GET', '/res/shaders/lighting-directional.frag~');
    new DataRequest(7051695, 7053472, 0, 0).open('GET', '/res/shaders/lighting-spot.vert');
    new DataRequest(7053472, 7056590, 0, 0).open('GET', '/res/shaders/colored.vert');
    new DataRequest(7056590, 7056752, 0, 0).open('GET', '/res/shaders/spritecol.frag');
    new DataRequest(7056752, 7059228, 0, 0).open('GET', '/res/shaders/lighting-spot.frag');

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
      // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though.
      var ptr = Module['_malloc'](byteArray.length);
      Module['HEAPU8'].set(byteArray, ptr);
      DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
          DataRequest.prototype.requests["/res/chr.png"].onload();
          DataRequest.prototype.requests["/res/body.png"].onload();
          DataRequest.prototype.requests["/res/tamane2.gpb"].onload();
          DataRequest.prototype.requests["/res/tamane2.material"].onload();
          DataRequest.prototype.requests["/res/hsp3dish.png"].onload();
          DataRequest.prototype.requests["/res/duck.material"].onload();
          DataRequest.prototype.requests["/res/body_SD.png"].onload();
          DataRequest.prototype.requests["/res/head_SD.png"].onload();
          DataRequest.prototype.requests["/res/sky.dds"].onload();
          DataRequest.prototype.requests["/res/duck-diffuse.png"].onload();
          DataRequest.prototype.requests["/res/font.gpb"].onload();
          DataRequest.prototype.requests["/res/sky.gpb"].onload();
          DataRequest.prototype.requests["/res/hsplogo8.png"].onload();
          DataRequest.prototype.requests["/res/ball64.png"].onload();
          DataRequest.prototype.requests["/res/duck.gpb"].onload();
          DataRequest.prototype.requests["/res/tamane.gpb"].onload();
          DataRequest.prototype.requests["/res/tamane.material"].onload();
          DataRequest.prototype.requests["/res/head.png"].onload();
          DataRequest.prototype.requests["/res/sky.material"].onload();
          DataRequest.prototype.requests["/res/tamane.material~"].onload();
          DataRequest.prototype.requests["/res/qbox.png"].onload();
          DataRequest.prototype.requests["/res/btex.png"].onload();
          DataRequest.prototype.requests["/res/shaders/colored.vert~"].onload();
          DataRequest.prototype.requests["/res/shaders/colored-unlit.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/textured-unlit.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/textured.frag"].onload();
          DataRequest.prototype.requests["/res/shaders/spritecol.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/textured.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/sprite.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/colored-unlit.vert~"].onload();
          DataRequest.prototype.requests["/res/shaders/lighting.frag"].onload();
          DataRequest.prototype.requests["/res/shaders/textured-bumped.frag"].onload();
          DataRequest.prototype.requests["/res/shaders/form.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/form.frag"].onload();
          DataRequest.prototype.requests["/res/shaders/lighting.frag~"].onload();
          DataRequest.prototype.requests["/res/shaders/skinning-none.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/sprite.frag"].onload();
          DataRequest.prototype.requests["/res/shaders/colored-unlit.frag"].onload();
          DataRequest.prototype.requests["/res/shaders/lighting-directional.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/spritecol.vert~"].onload();
          DataRequest.prototype.requests["/res/shaders/sprite.vert~"].onload();
          DataRequest.prototype.requests["/res/shaders/textured.frag~"].onload();
          DataRequest.prototype.requests["/res/shaders/lighting-point.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/terrain.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/terrain.frag"].onload();
          DataRequest.prototype.requests["/res/shaders/textured-unlit.frag"].onload();
          DataRequest.prototype.requests["/res/shaders/font.frag~"].onload();
          DataRequest.prototype.requests["/res/shaders/lighting-directional.frag"].onload();
          DataRequest.prototype.requests["/res/shaders/skinning.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/colored.frag"].onload();
          DataRequest.prototype.requests["/res/shaders/lighting-point.frag"].onload();
          DataRequest.prototype.requests["/res/shaders/textured-bumped.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/textured.vert~"].onload();
          DataRequest.prototype.requests["/res/shaders/font.frag"].onload();
          DataRequest.prototype.requests["/res/shaders/font.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/lighting-directional.frag~"].onload();
          DataRequest.prototype.requests["/res/shaders/lighting-spot.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/colored.vert"].onload();
          DataRequest.prototype.requests["/res/shaders/spritecol.frag"].onload();
          DataRequest.prototype.requests["/res/shaders/lighting-spot.frag"].onload();
          Module['removeRunDependency']('datafile_resources/hgimg4res.data');

    };
    Module['addRunDependency']('datafile_resources/hgimg4res.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

})();
