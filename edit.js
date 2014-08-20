(function() {
  var editor;

  function str2bytes(str, callback) {
	var fr = new FileReader();
	fr.onloadend = function() {
	  callback(new Uint8Array(fr.result));
	};
	fr.readAsArrayBuffer(new Blob([str]));
  }

  function setDownloadAx() {
	console.log('setup download');
	var buf = FS.readFile('source.ax');
	var blob = new Blob([buf],  {"type" : "application/octet-stream" });
	var url = URL.createObjectURL(blob);

	var resultElement = $('#result-ax');
	console.log(url);
	resultElement.attr("href", url);
	resultElement.attr("download", "out.ax");
  }

  function runAx() {
	var buf = FS.readFile('source.ax');
	var runFrame = document.getElementById('run');
	runFrame.onload = function() {
	  runFrame.contentWindow.runAX(buf);
	};
	runFrame.contentWindow.location.reload();
  }

  function compile(run) {
	console.log("compile");
	var src = editor.getValue();//$("#compile-input").val();

	console.log(src);
	str2bytes(src, function(data) {
	  console.log(data);
	  var stream = FS.open("source.hsp", 'w');
	  FS.write(stream, data, 0, data.length, 0);
	  FS.close(stream);

	  str2bytes("source.hsp", function(nameArray) {
		console.log(nameArray);
		console.log(String.fromCharCode.apply(null, nameArray));
		var bufPtr = Module._malloc(nameArray.byteLength);
		//console.log("malloc", bufPtr);
		//console.log(String.fromCharCode.apply(null, nameArray));
		Module.HEAPU8.set(nameArray, bufPtr);
		//console.log(String.fromCharCode.apply(null, nameArray));
		console.log("hsc_ini");
		Module.ccall('hsc_ini', 'number', ['number', 'number', 'number', 'number'],
					 [0, bufPtr, 0, 0]);
		console.log("hsc_comp");
		var st = Module.ccall('hsc_comp', 'number', ['number', 'number', 'number', 'number'],
							  [0, 0, 0, 0]);
		console.log("compile result", st);
		var mesPtr = Module._malloc(0x1000);
		Module.ccall('hsc_getmes', 'number', ['number', 'number', 'number', 'number'],
					 [mesPtr, 0, 0, 0]);
		//var mesArray = Module.HEAP8.subarray(mesPtr, mesPtr+0x1000);
		//var str = String.fromCharCode.apply(null, mesArray);
		var str = Pointer_stringify(mesPtr);
		var lines = str.split("\n");
		editor.session.clearAnnotations();
		for (var i = 0; i < lines.length; i++) {
		  var err = lines[i].match(/\.hsp\(([0-9]+)\) : error /);
		  if (err && err[1]) {
			var lineno = err[1] | 0;
			//editor.gotoLine(lineno);
			editor.session.setAnnotations([{
			  row:lineno - 1 ,column: 0,
			  text: lines[i], type:"error"}]); 
		  }
		}
		console.log(str);
		var src = $("#compile-error").val(str);
		if (st == 0) {
		  setDownloadAx();
		  if (run) {
			runAx();
		  }
		}
		Module._free(bufPtr);
		Module._free(mesPtr);
	  });
	});
  }

  var recompileID;

  $(document).ready(function() {
	console.log("ready");

	editor = ace.edit("compile-input");
	editor.setTheme("ace/theme/chrome");
	editor.getSession().setMode("ace/mode/hsp");

	editor.getSession().on("change", function() {
	  if (recompileID) {
		clearTimeout(recompileID);
	  }
	  recompileID = setTimeout(function() {
		recompileID = undefined;
		compile();
	  }, 2000);
	});

	$("#compile").click(function() {
	  compile(true);
	});
  });

  $("#sample li").click(function (e) {
	var src = $(e.target).attr("hsp");
	if (src) {
	  $.get(src, function(data) {
		//$("#compile-input").text(data);
		editor.setValue(data);
	  });
	}
  });
})();
