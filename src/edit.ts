/// <reference types="ace" />
/// <reference types="jquery" />
/// <reference types="emscripten" />

declare var Module: EmscriptenModule;

module TryHSP {
  var editor: any;

  function setDownloadAx(): void {
    console.log("setup download");
    var buf = FS.readFile("source.ax");
    var blob = new Blob([buf], { type: "application/octet-stream" });
    var url = URL.createObjectURL(blob);

    var resultElement = $("#result-ax");
    console.log(url);
    resultElement.attr("href", url);
    resultElement.attr("download", "out.ax");
  }

  function runAx(): void {
    var buf = FS.readFile("source.ax");
    var runFrame = <HTMLFrameElement>document.getElementById("run");
    runFrame.onload = () => runFrame.contentWindow["setAX"](buf);
    runFrame.contentWindow.location.reload();
  }

  function compile(run: boolean): void {
    console.log("compile");
    var src = editor.getValue();

    console.log(src);
    var data = new Uint8Array(Module.intArrayFromString(src));
    console.log(data);
    var stream = FS.open("source.hsp", "w");
    FS.write(stream, data, 0, data.length, 0);
    FS.close(stream);

    var name = Module.intArrayFromString("source.hsp");
    var bufPtr = Module._malloc(name.length);
    Module.writeArrayToMemory(name, bufPtr);

    console.log("hsc_ini");
    Module.ccall(
      "hsc_ini",
      "number",
      ["number", "number", "number", "number"],
      [0, bufPtr, 0, 0],
    );
    console.log("hsc_comp");
    var st = Module.ccall(
      "hsc_comp",
      "number",
      ["number", "number", "number", "number"],
      [0, 0, 0, 0],
    );
    console.log("compile result", st);
    var mesPtr = Module._malloc(0x1000);
    Module.ccall(
      "hsc_getmes",
      "number",
      ["number", "number", "number", "number"],
      [mesPtr, 0, 0, 0],
    );
    var str = Module.Pointer_stringify(mesPtr);
    var lines = str.split("\n");
    editor.session.clearAnnotations();
    for (var i = 0; i < lines.length; i++) {
      var err = lines[i].match(/\.hsp\(([0-9]+)\) : error /);
      if (err && err[1]) {
        var lineno = +err[1];
        //editor.gotoLine(lineno);
        editor.session.setAnnotations([
          {
            row: lineno - 1,
            column: 0,
            text: lines[i],
            type: "error",
          },
        ]);
      }
    }
    console.log(str);
    $("#compile-error").val(str);
    if (st == 0) {
      setDownloadAx();
      if (run) {
        runAx();
      }
    }
    Module._free(bufPtr);
    Module._free(mesPtr);
  }

  function share() {
    var src = editor.getValue();
    window.location.hash = "src=" + encodeURIComponent(src);
  }

  function loadFromHash() {
    var hash = window.location.hash;
    var pos = hash.indexOf("#src=");
    if (pos >= 0) {
      var enc = hash.substring(pos + "#src=".length);
      editor.setValue(decodeURIComponent(enc));
    }
  }

  let recompileID: number | undefined;

  $(document).ready(function () {
    console.log("ready");

    ace.require("ace/ext/language_tools");
    editor = ace.edit("compile-input");
    editor.setOptions({
      enableBasicAutocompletion: true,
    });
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/hsp");

    editor.getSession().on("change", () => {
      if (recompileID) {
        clearTimeout(recompileID);
      }
      recompileID = setTimeout(() => {
        recompileID = undefined;
        compile(false);
      }, 2000);
    });

    $("#compile").click(() => compile(true));
    $("#stop").click(() => {
      var runFrame = <HTMLFrameElement>document.getElementById("run");
      if (runFrame.contentWindow) {
        var m = runFrame.contentWindow["Module"];
        m.abort();
      }
    });
    $("#share").click(() => share());
    $(window).bind("hashchange", () => loadFromHash());
    loadFromHash();
  });

  $("#sample li").click((e) => {
    var src = $(e.target).attr("hsp");
    if (src) {
      $.get(src, function (data) {
        editor.setValue(data);
      });
    }
  });
}
