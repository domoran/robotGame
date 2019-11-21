// Generated automatically by nearley, version 2.19.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const flatten = d => {
    return d.reduce(
      (a, b) => {
        return a.concat(b);
      },
      []
    );
  };
const filter = d => {
    return d.filter((token) => {
      return token !== null;
    });
  };

var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "main$ebnf$1", "symbols": []},
    {"name": "main$ebnf$1$subexpression$1", "symbols": ["statement", "terminator"]},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "main$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main$ebnf$2", "symbols": ["statement"], "postprocess": id},
    {"name": "main$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["main$ebnf$1", "main$ebnf$2"], "postprocess": x => { return flatten(filter(flatten(x[0]))) }},
    {"name": "terminator$ebnf$1$subexpression$1", "symbols": [{"literal":"\n"}]},
    {"name": "terminator$ebnf$1$subexpression$1", "symbols": [{"literal":"\r"}]},
    {"name": "terminator$ebnf$1", "symbols": ["terminator$ebnf$1$subexpression$1"]},
    {"name": "terminator$ebnf$1$subexpression$2", "symbols": [{"literal":"\n"}]},
    {"name": "terminator$ebnf$1$subexpression$2", "symbols": [{"literal":"\r"}]},
    {"name": "terminator$ebnf$1", "symbols": ["terminator$ebnf$1", "terminator$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "terminator", "symbols": ["terminator$ebnf$1"], "postprocess": x=>null},
    {"name": "statement$ebnf$1$subexpression$1$subexpression$1", "symbols": ["action"]},
    {"name": "statement$ebnf$1$subexpression$1$subexpression$1", "symbols": ["expression"]},
    {"name": "statement$ebnf$1$subexpression$1", "symbols": ["statement$ebnf$1$subexpression$1$subexpression$1", "_"]},
    {"name": "statement$ebnf$1", "symbols": ["statement$ebnf$1$subexpression$1"]},
    {"name": "statement$ebnf$1$subexpression$2$subexpression$1", "symbols": ["action"]},
    {"name": "statement$ebnf$1$subexpression$2$subexpression$1", "symbols": ["expression"]},
    {"name": "statement$ebnf$1$subexpression$2", "symbols": ["statement$ebnf$1$subexpression$2$subexpression$1", "_"]},
    {"name": "statement$ebnf$1", "symbols": ["statement$ebnf$1", "statement$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statement", "symbols": ["statement$ebnf$1"], "postprocess": x=> { return filter(flatten(flatten(flatten(x)))) }},
    {"name": "expression", "symbols": [{"literal":"["}, "_", "sensor", "_", "statement", "_", {"literal":"]"}], "postprocess": i=> { return { 'type': 'expression', 'sensor': i[2], 'actions': i[4], loop: false }}},
    {"name": "expression", "symbols": [{"literal":"{"}, "_", "sensor", "_", "statement", "_", {"literal":"}"}], "postprocess": i=> { return { 'type': 'expression', 'sensor': i[2], 'actions': i[4], loop: true }}},
    {"name": "sensor$subexpression$1", "symbols": [{"literal":"F"}]},
    {"name": "sensor$subexpression$1", "symbols": [{"literal":"W"}]},
    {"name": "sensor", "symbols": ["sensor$subexpression$1"], "postprocess": x => x[0][0]},
    {"name": "action$subexpression$1", "symbols": [{"literal":"V"}]},
    {"name": "action$subexpression$1", "symbols": [{"literal":"L"}]},
    {"name": "action$subexpression$1", "symbols": [{"literal":"R"}]},
    {"name": "action", "symbols": ["action$subexpression$1"], "postprocess": x => { return { 'type':'action', 'value': x[0][0] } }}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
