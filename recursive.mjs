import { list } from "./common/setup.mjs";

/**
 * Find the nth element from the back of the list
 * 
 * How does this function work?
 * 
 * Let's say we have a list
 * 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> null
 * If we want to find the 3rd element from the back, we can do so by finding the end of the list and count back from there.
 * Since we don't have a double linked list, we can achieve this by recursively finding the end and therefore storing the previous items on the stack.
 * This violates the constant space requirement, but is still a single pass algorithm.
 * 
 * The steps are:
 * 
 * 1. Find the end of the list
 * (v is the cursor position)
 * 1st recursion:
 * v
 * 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> null
 * 2nd recursion:
 *      v
 * 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> null
 * 10th recursion:
 *                                              v
 * 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> null
 * 11th recursion:
 *                                                     v
 * 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> null
 * 
 * Now we are at the end of the list and can start counting back. We start at -1, because we are at the null element (so past the end of the list).
 * 
 * 2. Count back from the end
 * (v is the cursor position)
 * 11th recursion, index -1, result null:
 *                                                     v
 * 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> null
 * 10th recursion, index 0, result null:
 *                                              v
 * 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> null
 * 9th recursion, index 1, result null:
 *                                         v
 * 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> null
 * 8th recursion, index 2, result 8:
 *                                    v
 * 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> null
 * 
 * Now we found the correct element and can return it. Index is 2, because we started counting at 0.
 * 
 * 3. Return the result
 * 
 * 7th recursion, index 2, result 8:
 *                               v
 * 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> null
 * 
 * ...
 * 
 * 2nd recursion, index 2, result 8:
 *      v
 * 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> null
 * 1st recursion, index 2, result 8:
 * v
 * 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> null
 * 
 * We are back at the start of the list and can return the result.
 * 
 * @param {List} list List to search
 * @param {number} n Index from the back
 * @returns {{result: List, index: number}} The element at the nth position from the back and its index from the back
 */
const findFromBackCounted = (list, n) => {
  // This is the end of the list -> return null and -1 to signal end
  if (list === null) {
    return {
      result: null,
      index: -1,
    };
  }
  // Recursively find the element at the nth position from the back, so we can start counting from the back
  const { result, index } = findFromBackCounted(list.next, n);
  // If the index is n, then we aalready found the element at the nth position from the back
  if (index === n) {
    return {
      result,
      index,
    };
  }
  // If the index is not n, then we are not yet at the nth position from the back, so we need to increment the index
  return {
    result: list,
    index: index + 1,
  };
};

/**
 * Find the nth list item from the back or return null if it doesn't exist
 * @param {List} list List to search in
 * @param {number} n Starting point to count from the back
 * @returns {List | null} The element at the nth position from the back
 */
const findFromBack = (list, n) => {
  if (n < 0) {
    throw new Error("n must be greater than or equal to 0");
  }
  const { result, index } = findFromBackCounted(list, n);
  // If the index is not n, then the list is shorter than n elements
  if (index !== n) {
    return null;
  }
  return result;
};

console.log(findFromBack(list, 99));
