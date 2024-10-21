const { createRule, combineRules, evaluateRule } = require('../backend/services/ruleEngine');

test('should create a rule and return AST', () => {
    const ruleString = "age > 30 AND department = 'Sales'";
    const ast = createRule(ruleString);
    expect(ast.type).toBe("operator");
    expect(ast.value).toBe("AND");
});

test('should combine rules correctly', () => {
    const rules = ["age > 30 AND department = 'Sales'", "salary > 50000"];
    const combinedAST = combineRules(rules);
    expect(combinedAST.type).toBe("operator");
    expect(combinedAST.value).toBe("AND");
});

test('should evaluate rule correctly', () => {
    const ruleString = "age > 30 AND department = 'Sales'";
    const ast = createRule(ruleString);
    const userData = { age: 35, department: "Sales", salary: 60000 };
    const result = evaluateRule(ast, userData);
    expect(result).toBe(true);
});
