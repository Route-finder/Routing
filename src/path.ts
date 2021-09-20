type ListNode = [contents: String, toRightCost: number]

const upperFloor: ListNode[] = [
    ["A", 1],
    ["B", 5],
    ["C", 8],
    ["D", 15],
    ["E", 3],
]

function filterUnneeded(list: ListNode[], toUse: String[]): ListNode[] {
    return list.filter(node => (typeof toUse.find(s => s == node[0])) === "undefined")
}

// Add a node to the path if it is in the toUse list.
//  If it isn't in the toUse list, preserve distance by adding to the old path
function addDistance(prevPath: ListNode[], currentNode: ListNode, toUse: String[]): ListNode[] {
    let hasStr = (node: ListNode) => 
        (typeof toUse.find(s => s === node[0])) === "undefined";
    if (hasStr(currentNode)) {
        let lastIndex = prevPath.length - 1;
        let last = prevPath[lastIndex];
        let newLast: ListNode = [last[0], last[1] + currentNode[1]];
        return prevPath.slice(0, lastIndex - 1).concat([newLast]);
    } else {
        return prevPath.concat([currentNode]);
    }
}

// Filter out unused nodes without changing the route length
function filterPreserveLength(list: ListNode[], toUse: String[]): ListNode[] {
    let addDistWithLocations = (list: ListNode[], currentNode: ListNode) => addDistance(list, currentNode, toUse);
    return list.reduce(addDistWithLocations, [["Entry", 0]])
}

console.log(filterPreserveLength(upperFloor, ["A", "E"]));``
