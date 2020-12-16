import ts from "typescript";
const { SyntaxKind } = ts;
import { program } from "../main";
import { combine, parseNodeToString, ParseState } from "../parse_node";
import { ParseNodeType } from "../parse_node"

export const parseCallExpression = (node: ts.CallExpression, props: ParseState): ParseNodeType => {
  // TODO: Work out a better way to determine if something is a call expression
  if (node.expression.getText() === "super") {
    return combine(node, node.expression, props, () => "");
  }

  // This block compiles vec.add(vec2) into vec + vec2.

  // node = [[ a.b(c) ]]
  if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {

    // prop = [[ a.b ]](c)
    const prop = node.expression as ts.PropertyAccessExpression;
    const functionName = prop.name.getText();

    const type = program.getTypeChecker().getTypeAtLocation(prop.expression);
    const stringType = program.getTypeChecker().typeToString(type);
    const isVector = (
      stringType === "Vector2" ||
      stringType === "Vector2i" ||
      stringType === "Vector3" ||
      stringType === "Vector3i"
    );

    let operator: undefined | string = undefined;

    if (functionName === "add" && isVector) operator = "+";
    if (functionName === "sub" && isVector) operator = "-";
    if (functionName === "mul" && isVector) operator = "*";
    if (functionName === "div" && isVector) operator = "/";

    if (operator !== undefined) {
      return combine(node, [node.expression, node.arguments[0]], props, (exp, arg) => `${exp} ${operator} ${arg}`);
    }
  }

  return combine(node, [node.expression, ...node.arguments], props, (expr, ...args) => {
    if (expr === "Yield") expr = "yield";

    return `${expr}(${args.join(', ')})`;
  });
}
