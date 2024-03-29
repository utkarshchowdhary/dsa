// Treap: Randomized Binary Search Tree.

class Node {
  constructor(value) {
    this.value = value
    this.priority = Math.floor(Math.random() * 100)
    this.left = null
    this.right = null
  }
}

class Treap {
  constructor() {
    this.root = null
  }

  rotateLeft(node) {
    // rotate node in counter-clockwise direction.
    const newParent = node.right
    node.right = newParent.left
    newParent.left = node
    return newParent
  }

  rotateRight(node) {
    // rotate node in clockwise direction.
    const newParent = node.left
    node.left = newParent.right
    newParent.right = node
    return newParent
  }

  insert(value) {
    this.root = this._insert(this.root, value)
  }

  _insert(node, value) {
    if (!node) return new Node(value)

    if (value < node.value) {
      node.left = this._insert(node.left, value)
      // if the node's left child has a higher preference then rotate the node towards right.
      if (node.priority > node.left.priority) {
        node = this.rotateRight(node)
      }
    } else if (value > node.value) {
      node.right = this._insert(node.right, value)
      // if the node's right child has a higher preference then rotate the node towards left.
      if (node.priority > node.right.priority) {
        node = this.rotateLeft(node)
      }
    }

    return node
  }

  delete(value) {
    this.root = this._delete(this.root, value)
  }

  _delete(node, value) {
    if (!node) return null

    if (value < node.value) {
      node.left = this._delete(node.left, value)
    } else if (value > node.value) {
      node.right = this._delete(node.right, value)
    } else {
      if (node.left && node.right) {
        if (node.left.priority < node.right.priority) {
          // if the node's left child has a higher preference than right then rotate the node towards right,
          // this will move the node to be deleted further down right.
          node = this.rotateRight(node)
          node.right = this._delete(node.right, value)
        } else {
          // if the node's right child has a higher preference than left then rotate the node towards left,
          // this will move the node to be deleted further down left.
          node = this.rotateLeft(node)
          node.left = this._delete(node.left, value)
        }
      } else if (node.left) {
        return node.left
      } else if (node.right) {
        return node.right
      } else {
        return null
      }
    }

    return node
  }
}

const treap = new Treap()
treap.insert(1)
treap.insert(2)
treap.insert(3)
treap.insert(4)
treap.insert(5)
treap.insert(6)

console.dir(treap, { depth: null })
