/**
 * Binary heaps are only allowed to have at most 2 children to a parent.
 * Unlike with binary search trees, where we compared and organized our values across siblings,
 * with heaps we only work between parents and their children.
 * The heap can either be a max heap or a min heap.
 * In a max heap all internal nodes have value greater than or equal to the values in it's children.
 * In a min heap all internal nodes have value less than or equal to the values in it's children.
 * Heap is always balanced because every new node will be added to a level from left to right until full.
 *
 * Properties
 * The largest or the smallest element can be quickly found in a heap.
 * There is a consistent pattern for finding a node's children,
 * a node's left child will be at position 2i+1 and right child being at position 2i+2,
 * with i being the parent index.
 * A node's parent will be at position floor((i-1)/2) with i being the child node's index.
 */

class BinaryHeap {
  constructor() {
    this.heap = []
  }

  isEmpty() {
    return !this.heap.length
  }

  parent(i) {
    return Math.floor((i - 1) / 2)
  }

  left(i) {
    return 2 * i + 1
  }

  right(i) {
    return 2 * i + 2
  }

  add(value) {
    // adding a new node can be done by simply pushing it onto an array
    // then "bubbling up" new node's value if greater than parent.
    let index = this.heap.push(value) - 1

    // When index is at 0, can not go up any further,
    // if the node's value is greater than its parent,
    // swap them and save its parent's index which will be the node's next position.
    while (index > 0 && value > this.heap[this.parent(index)]) {
      const parent = this.heap[this.parent(index)]

      this.heap[this.parent(index)] = value
      this.heap[index] = parent
      index = this.parent(index)
    }
  }

  extractMax() {
    // replace the root node with the "fartest right node" on the lowest level of the heap.
    const max = this.heap[0]
    const last = this.heap.pop()

    // if there are no nodes left in the heap after removing the last node,
    // i.e., initially it was empty or only had one node, return the root node.
    if (this.isEmpty()) return max

    this.heap[0] = last

    const n = this.heap.length
    let index = 0
    const current = this.heap[0]

    while (true) {
      let leftIndex = this.left(index)
      let rightIndex = this.right(index)
      let next = index

      // set the index of the left child to the next if it exists and is greater than the current node.
      if (leftIndex < n && this.heap[leftIndex] > current) {
        next = leftIndex
      }

      // set the index of the right child to the next if it exists and is greater than the greatest between
      // the current node and its left child.
      if (rightIndex < n && this.heap[rightIndex] > this.heap[next]) {
        next = rightIndex
      }

      // if the current node is greater than its children break out of the loop.
      if (next === index) break

      // Otherwise, swap the current node with the next node and
      // save its position, which will be the next current.
      this.heap[index] = this.heap[next]
      this.heap[next] = current
      index = next
    }

    return max
  }
}

const tree = new BinaryHeap()
/*
      45
    12  7
  3 8
*/
tree.add(3)
tree.add(45)
tree.add(7)
tree.add(12)
tree.add(8)

console.log(tree)
