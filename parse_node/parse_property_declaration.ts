import ts from "typescript";
import { combine, ParseState } from "../parse_node";
import { getGodotType, getTypeHierarchy, isEnumType } from "../ts_utils";
import { ParseNodeType } from "../parse_node"

const isExported = (node: ts.PropertyDeclaration) => {
  for (const dec of node.decorators ?? []) {
    if (dec.expression.getText() === "exports") {
      return true;
    }
  }

  return false;
}

const isOnReady = (node: ts.PropertyDeclaration, props: ParseState) => {
  if (node.initializer) {

    // I think there's some sort of race where we save .d.ts files too fast to 
    // then have the type checker re-analyze them, so the get_node() calls have a habit
    // of coming back as 'any' when we use the typechecker on them.

    if (node.initializer.getText().includes("get_node(")) {
      return true;
    }

    // TODO: This isn't quite so simple, because we could do something like node.value - where
    // node is Node but value is int - which we should mark as onready, but we aren't currently

    const initializerType = props.program.getTypeChecker().getTypeAtLocation(node.initializer);
    const hierarchy = getTypeHierarchy(initializerType).map(x => props.program.getTypeChecker().typeToString(x));

    return hierarchy.includes('Node2D') || hierarchy.includes('Node');
  }

  return false;
}

export const parsePropertyDeclaration = (node: ts.PropertyDeclaration, props: ParseState): ParseNodeType => {
  let exportedType = props.program.getTypeChecker().getTypeAtLocation(node);
  let exportedTypeName = getGodotType(node, props, node.initializer, node.type);
  let typeHintName = exportedTypeName;

  if (isEnumType(exportedType)) {
    exportedTypeName = props.program.getTypeChecker().typeToString(exportedType);
  }

  const exportText = isExported(node) ? `export(${exportedTypeName}) ` : '';
  const onReady = isOnReady(node, props);

  return combine({
    parent: node,
    nodes: node.initializer,
    props,
    content: initializer => `${exportText}${onReady ? 'onready ' : ''}var ${node.name.getText()}${typeHintName ? `: ${typeHintName}` : ''}${initializer && ` = ${initializer}`}`
  });
}