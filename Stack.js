/**
 * A Stack is a linear data structure in which elements can be inserted and deleted only from one end
 * of the list.
 * Stacks are based on the LIFO principle, i.e., the element inserted at the last, is the first element to
 * come out of the list.
 */

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Stack {
  constructor() {
    this.top = null
    this.size = 0
  }

  isEmpty() {
    return !this.top
  }

  peek() {
    return this.top?.value
  }

  push(value) {
    const node = new Node(value)

    if (this.isEmpty()) {
      this.top = node
    } else {
      node.next = this.top
      this.top = node
    }

    return ++this.size
  }

  pop() {
    if (this.isEmpty()) return

    const current = this.top
    this.top = this.top.next
    this.size--

    return current.value
  }
}

// const stack = new Stack()

// stack.push('google')
// stack.push('yahoo')
// stack.push('bing')

// stack.pop()

// console.dir(stack, { depth: null })

exports.Stack = Stack
