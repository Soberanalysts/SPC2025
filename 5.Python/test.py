class Node:
    def __init__(self, value):
        self.value = value
        self.children = []

def tree(li):    
    nodes = [Node(i) for i in li]
    for i in range(1, len(li)):
        nodes[(i - 1) // 2].children.append(nodes[i])
    return nodes[0]

def s(node, level=0):
    return (node.value if level % 2 else 0) + sum(s(n, level + 1) for n in node.children) if node else 0

li = [3, 5, 8, 12, 15, 18, 20]

root = tree(li)        
print(s(root))