const gr = require("@/grammar/robot");
const nearley = require("nearley");

export default class Parser {


  constructor() {
  }

  parse(code) {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(window.grammar));
    const result = parser.feed(code + "\n");
    return result.results[0];
  }


}
