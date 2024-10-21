const Node = require('../models/astNode');

// Parse a rule string like "age > 30 AND department = 'Sales'" into AST
function parseRule(ruleString) {
    const tokens = ruleString.split(/\s+/);
    if (tokens.length === 3) {
        // Handle operand, e.g., "age > 30"
        const [leftOperand, operator, rightOperand] = tokens;
        return new Node('operand', null, null, { leftOperand, operator, rightOperand });
    }
    if (tokens.includes("AND") || tokens.includes("OR")) {
        const operator = tokens.includes("AND") ? "AND" : "OR";
        const leftExpr = ruleString.split(operator)[0].trim();
        const rightExpr = ruleString.split(operator)[1].trim();
        return new Node('operator', parseRule(leftExpr), parseRule(rightExpr), operator);
    }
    throw new Error('Invalid rule format');
}

module.exports = { parseRule };
