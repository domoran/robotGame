# Match a CSS color
# http://www.w3.org/TR/css3-color/#colorunits
@{%
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

%}

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

main -> (statement terminator):* statement:?   {%  x => { return flatten(filter(flatten(x[0]))) }  %}

terminator -> ("\n" | "\r"):+ {% x=>null %}
statement -> ((action | expression) _):+ {%  x=> { return filter(flatten(flatten(flatten(x)))) }  %}
expression -> "[" _ sensor _ statement _ "]" {%  i=> { return { 'type': 'expression', 'sensor': i[2], 'actions': i[4] }} %}

sensor -> ("F" | "W") {% x => x[0][0] %}
action -> ("V" | "L" | "R") {% x => { return { 'type':'action', 'value': x[0][0] } } %}
