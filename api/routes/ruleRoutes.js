const express = require('express');
const { createRule, combineRules, evaluateRule } = require('../../backend/services/ruleEngine');
const Rule = require('../../backend/models/rule');

const router = express.Router();

// Create a new rule
router.post('/create_rule', async (req, res) => {
    const { ruleName, ruleString } = req.body;
    try {
        const newRule = await createRule(ruleName, ruleString);
        res.status(201).json({ message: `Rule '${ruleName}' created`, newRule });
    } catch (error) {
        res.status(500).json({ message: 'Error creating rule', error });
    }
});

// Combine multiple rules
router.post('/combine_rules', (req, res) => {
    const { ruleStrings } = req.body;
    try {
        const combinedAST = combineRules(ruleStrings);
        res.json({ combinedAST });
    } catch (error) {
        res.status(500).json({ message: 'Error combining rules', error });
    }
});

// Evaluate rule against user data
router.post('/evaluate_rule', async (req, res) => {
    const { ruleName, data } = req.body;
    try {
        const rule = await Rule.findOne({ name: ruleName });
        if (!rule) return res.status(404).json({ message: 'Rule not found' });
        const result = evaluateRule(rule.ast, data);
        res.json({ eligible: result });
    } catch (error) {
        res.status(500).json({ message: 'Error evaluating rule', error });
    }
});

module.exports = router;
