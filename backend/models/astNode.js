class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type;   // "operator" or "operand"
        this.left = left;   // Left child node
        this.right = right; // Right child node
        this.value = value; // Operand value or operator (e.g., "AND", "age > 30")
    }
}

module.exports = Node;
