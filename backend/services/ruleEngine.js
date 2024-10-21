const Node = require('../models/astNode');
const Rule = require('../models/rule');

// Create rule from string
async function createRule(ruleName, ruleString) {
    const { parseRule } = require('./parser');
    const ast = parseRule(ruleString);
    const newRule = new Rule({ name: ruleName, ast });
    await newRule.save();
    return newRule;
}

// Combine multiple rules into a single AST
function combineRules(rules) {
    let combinedAST = null;
    for (const ruleString of rules) {
        const currentAST = parseRule(ruleString);
        if (combinedAST === null) {
            combinedAST = currentAST;
        } else {
            combinedAST = new Node('operator', combinedAST, currentAST, 'AND');
        }
    }
    return combinedAST;
}

// Evaluate AST against user data
function evaluateRule(ast, data) {
    if (ast.type === 'operand') {
        const { leftOperand, operator, rightOperand } = ast.value;
        return eval(`${data[leftOperand]} ${operator} ${rightOperand}`);
    } else if (ast.type === 'operator') {
        const leftResult = evaluateRule(ast.left, data);
        const rightResult = evaluateRule(ast.right, data);
        if (ast.value === 'AND') {
            return leftResult && rightResult;
        } else if (ast.value === 'OR') {
            return leftResult || rightResult;
        }
    }
}

module.exports = { createRule, combineRules, evaluateRule };
