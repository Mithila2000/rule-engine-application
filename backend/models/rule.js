const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ast: { type: Object, required: true },  // The AST represented as a JSON object
});

const Rule = mongoose.model('Rule', ruleSchema);
module.exports = Rule;
