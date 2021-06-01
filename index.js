class Node {
	constructor(val, next, prev) {
		this.val = val;
		this.next = next;
		this.prev = prev;
	}
}

class MergeSort {

    static getMiddle(head) {
        let slow = head;
        let fast = head;
        while(!(!fast.next) && !(!fast.next.next)) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

	static merge(left, right) {

		if (!left) {
			return right;
		}

		if (!right) {
			return left;
		}

		let result = null;

		if(left.val <= right.val) {
			result = left;
			result.next = MergeSort.merge(left.next, right);
		} else {
			result = right;
			result.next = MergeSort.merge(left, right.next);
		}

		return result;

	}

	static sort(head) {
		
		if (!head || !head.next) {
			return head;
		}

		const middle = MergeSort.getMiddle(head);
		const secondHalf = middle.next;
		middle.next = null; // prevents stack overflow!!
		const left  = MergeSort.sort(head);
		const right = MergeSort.sort(secondHalf);

		return MergeSort.merge(left, right);
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	sort() {
		return MergeSort.sort(this.head);
	}

	toArray(head) {
        let result = [];
        let curr = head;
        while(curr) {
            result.push(curr.val);
            curr = curr.next;
        }
        return result;    
    }

	addToHead(val) {
		const newNode = new Node(val, this.head, null);
		if (this.head) {
			this.head.prev = newNode;
		} else {
			this.tail = newNode;
		}
		this.head = newNode;
	}

	addToTail(val) {
		const newNode = new Node(val, null, this.tail);
		if(this.tail) {
			this.tail.next = newNode;
		} else {
			this.head = newNode;
		}
		this.tail = newNode;
	}
}


let myll = new LinkedList();

myll.addToHead(3);
myll.addToHead(5);
myll.addToHead(7);
myll.addToHead(9);

console.log(myll.toArray(myll.head));

console.log(myll.toArray(myll.sort()));

