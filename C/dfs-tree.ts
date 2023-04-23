class ThreeNode {
    value: number;
    left: ThreeNode | null;
    right: ThreeNode | null;
  
    constructor(value: number) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  class Tree {
    root: ThreeNode | null;
  
    constructor() {
      this.root = null;
    }
  
    // Method to insert a new node into the tree
    insert(value: number) {
      const newNode = new ThreeNode(value);
  
      if (this.root === null) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode);
      }
    }
  
    private insertNode(node: ThreeNode, newNode: ThreeNode) {
      if (newNode.value < node.value) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          this.insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          this.insertNode(node.right, newNode);
        }
      }
    }
  
    createDFS(order: string): DFS {
      switch (order) {
        case "preorder":
          return new PreorderDFS(this.root);
        case "postorder":
          return new PostorderDFS(this.root);
        case "inorder":
          return new InorderDFS(this.root);
        default:
          throw new Error("Invalid DFS traversal order");
      }
    }
  }
  
 
  interface DFS {
    traverse(): number[];
  }
  
  class PreorderDFS implements DFS {
    node: ThreeNode | null;
    result: number[];
  
    constructor(node: ThreeNode | null) {
      this.node = node;
      this.result = [];
    }
  
    traverse() {
      if (this.node !== null) {
        this.result.push(this.node.value);
        const leftDFS = new PreorderDFS(this.node.left);
        this.result = this.result.concat(leftDFS.traverse());
        const rightDFS = new PreorderDFS(this.node.right);
        this.result = this.result.concat(rightDFS.traverse());
      }
      return this.result;
    }
  }
  
  class PostorderDFS implements DFS {
    node: ThreeNode | null;
    result: number[];
  
    constructor(node: ThreeNode | null) {
      this.node = node;
      this.result = [];
    }
  
    traverse() {
      if (this.node !== null) {
        const leftDFS = new PostorderDFS(this.node.left);
        this.result = this.result.concat(leftDFS.traverse());
        const rightDFS = new PostorderDFS(this.node.right);
        this.result = this.result.concat(rightDFS.traverse());
        this.result.push(this.node.value);
      }
      return this.result;
    }
  }
  
  class InorderDFS implements DFS {
    node: ThreeNode | null;
    result: number[];
  
    constructor(node: ThreeNode | null) {
      this.node = node;
      this.result = [];
    }
  
    traverse() {
      if (this.node !== null) {
        const leftDFS = new InorderDFS(this.node.left);
        this.result = this.result.concat(leftDFS.traverse());
        this.result.push(this.node.value);
        const rightDFS = new InorderDFS(this.node.right);
        this.result = this.result.concat(rightDFS.traverse());
      }
      return this.result;
    }
  }
  

  const tree = new Tree();
  tree.insert(5);
  tree.insert(3);
  console.log(tree)