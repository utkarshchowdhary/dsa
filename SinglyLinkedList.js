/**
 * Linked List is a data structure where every element is connected to the next one.
 * A node in Singly Linked List contains a set of values, the value of the data you want to store and
 * a pointer to the next node in line.
 * Most computers have caching system that make reading from sequential memory faster than reading from
 * scattered addresses. So, traversing through a linked list is slower than iterating through an array,
 * even though both of them are O(n).
 * However insert and delete in middle of linked list is a lot better than array.
 */

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  append(value) {
    const node = new Node(value)

    if (this.head) {
      this.tail.next = node
      this.tail = node
    } else {
      this.head = node
      this.tail = node
    }

    this.size++
  }

  prepend(value) {
    const node = new Node(value)

    if (this.head) {
      node.next = this.head
      this.head = node
    } else {
      this.head = node
      this.tail = node
    }

    this.size++
  }

  print() {
    let current = this.head

    while (current) {
      process.stdout.write(`${current.value}->`)
      current = current.next
    }

    process.stdout.write(`null\n`)
  }

  insert(index, value) {
    if (index >= this.size) {
      // throw new Error("Index out of bounds");
      this.append(value)
      return
    }

    if (index === 0) {
      this.prepend(value)
      return
    }

    const node = new Node(value)

    let current = this.head
    let previous = null

    while (index !== 0) {
      previous = current
      current = current.next
      index--
    }

    node.next = current
    previous.next = node

    this.size++
  }

  removeFirst() {
    if (!this.head) return

    if (this.size === 1) {
      this.head = null
      this.tail = null
    } else {
      this.head = this.head.next
    }

    this.size--
  }

  removeLast() {
    if (!this.head) return

    if (this.size === 1) {
      this.head = null
      this.tail = null
    } else {
      let previousToTail = this.head

      while (previousToTail.next !== this.tail) {
        previousToTail = previousToTail.next
      }

      previousToTail.next = null
      this.tail = previousToTail
    }

    this.size--
  }

  remove(index) {
    if (index >= this.size) {
      throw new Error('Index out of bounds')
    }

    if (index === 0) {
      this.removeFirst()
      return
    }

    if (index === this.size - 1) {
      this.removeLast()
      return
    }

    let current = this.head
    let previous = null

    while (index !== 0) {
      previous = current
      current = current.next
      index--
    }

    previous.next = current.next

    this.size--
  }

  reverse() {
    let current = this.head
    let prev = null

    while (current) {
      let next = current.next
      current.next = prev
      prev = current

      current = next
    }

    this.tail = this.head
    this.head = prev
  }
}

const singlyLinkedList = new SinglyLinkedList()

singlyLinkedList.append('3')
singlyLinkedList.append('5')

singlyLinkedList.prepend('1')

singlyLinkedList.insert(1, '2')
singlyLinkedList.insert(3, '4')

singlyLinkedList.insert(0, '0')

singlyLinkedList.reverse()

singlyLinkedList.print()

console.dir(singlyLinkedList, { depth: null })
