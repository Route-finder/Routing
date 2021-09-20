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
// Go left, then go right
// Using brute force now
function shortestPath(list: ListNode[]): OutPath {
    
    let ltrSum = (path: ListNode[]) => path.reduce((previous, current) => previous + current[1], 0);
    let rtlSum = (path: ListNode[]) => ltrSum(path.reverse());

    let costWithPivot = Array.from(list.keys()).map(i => {
        console.log(list.slice(0, i));
        console.log(list.slice(i));
        return [ltrSum(list.slice(i)) + rtlSum(list.slice(0, list.length - i)), i]
    });
    
    console.log(costWithPivot)
}

console.log(shortestPath(upperFloor));
