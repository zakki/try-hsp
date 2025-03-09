ace.define("ace/mode/hsp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

  var HspHighlightRules = function() {

	this.$rules = {
      "start": [
		{
          token: [
			"meta.ending-space"
          ],
          regex: "$"
		},
        {
          token: "comment",
          regex: "(;|//).*$",
        },
        {
          token : "comment", // multi line comment
          regex : "\\/\\*",
          next : "comment"
        },
		{
          token : "keyword", // pre-compiler directives
          regex : "#\\s*(?:addition|aht|ahtmes|cfunc|cmd|cmpopt|comfunc|const|defcfunc|deffunc|define|else|enum|func|global|if|ifndef|include|modcfunc|modfunc|modinit|modterm|module|pack|packopt|regcmd|runtime|undef|usecom|uselib)\\b",
          next  : "directive"
		},
		{
          token : "constant.other", // label
          regex : "\\*(\\b[a-zA-Z_x7f-xff][a-zA-Z0-9_x7f-xff]*?\\b)"
		},
        {
          token: [
            "keyword.control"
          ],
          regex: "\\b(?:_break|_continue|await|break|case|continue|default|do|else|end|exec|exgoto|for|foreach|gosub|goto|if|loop|next|on|onclick|oncmd|onerror|onexit|onkey|repeat|return|run|stop|swbreak|swend|switch|until|wait|wend|while)\\b"
        },
        {
          token: "punctuation.definition.string.begin",
          regex: '"',
          next: "string"
        },
        {
          token: "support.function",
          regex: "\\b(?:Lock|Unlock|SetAbort|SetComplete|BinaryRead|AddHeader|AppendToLog|BinaryWrite|Clear|End|Flush|Redirect|Write|CreateObject|HTMLEncode|MapPath|URLEncode|Abandon|Convert|Regex)\\b"
        },
        {
          token: [
            "constant.numeric"
          ],
          regex: "-?\\b(?:(?:(?:0(?:x|X)|(\\\$))[0-9a-fA-F]*)|(?:(?:[0-9]+\\.?[0-9]*)|(?:\\.[0-9]+))(?:(?:e|E)(?:\\+|-)?[0-9]+)?)(?:L|l|UL|ul|u|U|F|f)?\\b"
        },
        {
          token: [
            "entity.name.function"
          ],
          regex: "(?:(\\b[a-zA-Z_x7f-xff][a-zA-Z0-9_x7f-xff]*?\\b)(?=\\(\\)?))"
        },
        {
          token: [
            "keyword.operator"
          ],
          regex: "\\-|\\+|\\*\\\/|\\>|\\<|\\=|\\&"
        }
      ],
      "comment": [
        {
          token : "comment", // closing comment
          regex : ".*?\\*\\/",
          next : "start"
        }, {
          token : "comment", // comment spanning whole line
          regex : ".+"
        }
      ],
      "string": [
        {
          token: "constant.character.escape.apostrophe",
          regex: '""'
        },
        {
          token: "string.quoted.double",
          regex: '"',
          next: "start"
        },
        {
          defaultToken: "string.quoted.double"
        }
      ],
      "directive" : [
        {
          token : "constant.other.multiline",
          regex : /\\/
        },
        {
          token : "constant.other.multiline",
          regex : /.*\\/
        },
            {
              token : "constant.other",
              regex : "\\s*<.+?>",
              next : "start"
            },
        {
          token : "constant.other", // single line
          regex : '\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]',
          next : "start"
        }, 
        {
                token : "constant.other", // single line
          regex : "\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",
          next : "start"
        },
        {
          token : "constant.other",
          regex : /[^\\\/]+/,
          next : "start"
        }
      ]
    }

  };

  oop.inherits(HspHighlightRules, TextHighlightRules);

  exports.HspHighlightRules = HspHighlightRules;
});

ace.define("ace/mode/hsp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/hsp_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var HspHighlightRules = require("./hsp_highlight_rules").HspHighlightRules;

var Mode = function() {
  this.HighlightRules = HspHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
  this.lineCommentStart = [";", "//"];
  this.blockComment = {start: "/*", end: "*/"};

  this.$id = "ace/mode/hsp";
}).call(Mode.prototype);

exports.Mode = Mode;
});
