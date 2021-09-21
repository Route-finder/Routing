type ListNode = [contents: String, toRightCost: number]
type OutPath = [leftPath: ListNode[], rightPath: ListNode[]]

const upperFloor: ListNode[] = [
    ["Entry", 1],
    ["B", 5],
    ["C", 8],
    ["D", 700],
    ["E", 3],
]

function filterUnneeded(list: ListNode[], toUse: String[]): ListNode[] {
    return list.filter(node => (typeof toUse.find(s => s == node[0])) === "undefined")
}

// Add a node to the path if it is in the toUse list.
//  If it isn't in the toUse list, preserve distance by adding to the old path
function addDistance(prevPath: ListNode[], currentNode: ListNode, toUse: String[]): ListNode[] {
    let hasStr = (node: ListNode) => 
        (typeof toUse.find(s => s === node[0])) !== "undefined";
    if (hasStr(currentNode)) {
        return prevPath.concat([currentNode]);
    } else {
        let lastIndex = prevPath.length - 1;
        let last = prevPath[lastIndex];
        let newLast: ListNode = [last[0], last[1] + currentNode[1]];
        return prevPath.slice(0, lastIndex).concat([newLast]);
    }
}

// Filter out unused nodes without changing the route length
function filterPreserveLength(list: ListNode[], toUse: String[]): ListNode[] {
    let addDistWithLocations = (list: ListNode[], currentNode: ListNode) => addDistance(list, currentNode, toUse);
    return list.slice(1).reduce(addDistWithLocations, [list[0]])
}

// Precondition: list is filtered so we need to visit every node
// Remove maximal cost node
function shortestPath(list: ListNode[]): OutPath {
    let maxDist: [number, ListNode] = [0, list[0]];
    for (let value of list.entries()) {
        if (maxDist[1][1] <  value[1][1]) {
            maxDist = value;
        }
    }
    let indexToSplitAt = maxDist[0];
    return [list.slice(0, indexToSplitAt), list.slice(indexToSplitAt+1)]
}

// console.log(shortestPath(upperFloor));
