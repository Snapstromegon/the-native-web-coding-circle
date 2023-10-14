import { List } from './list.mjs';

/*
  Create a list of 100 elements ranging from 0 to 99
*/
const list = new List(0);
for(let i = 1; i < 100; i++) {
  list.append(i);
}

export { list };