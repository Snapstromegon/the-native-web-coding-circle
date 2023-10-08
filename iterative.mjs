import { List } from "./common/list.mjs";
import { list } from "./common/setup.mjs";

/**
 * Find the nth element from the back of the list
 * 
 * This is done by using two pointers. The first pointer is always n elements ahead of the second pointer.
 * This way we know that once the first pointer reaches the end of the list, the second pointer is at the nth element from the back.
 * 
 * @param {List} list The list to search in
 * @param {number} n the index from the back [starts at 0]
 * @returns {List | null} The nth element from the back
 */
const nthFromBack = (list, n) => {
  let leader = list;
  let follower = list;

  // move the leader pointer n elements ahead of the follower pointer
  for (let i = 0; i < n; i++) {
    // if the leader pointer reaches the end of the list here, the list is shorter than n elements -> return null
    if(leader.next === null) return null;
    leader = leader.next;
  }

  // move both pointers until the leader pointer reaches the end of the list
  while (leader.next !== null) {
    leader = leader.next;
    follower = follower.next;
  }

  // the follower pointer is now at the nth element from the back
  return follower;
};

console.log(nthFromBack(list, 5));
