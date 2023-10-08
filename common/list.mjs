export class List {
  constructor(value) {
    this.value = value;
    this.next = null;
  }

  /**
   * Recursively append a new element to the list
   * @param {unknown} value Value of the new element
   */
  append(value) {
    if(this.next === null) {
      this.next = new List(value);
    } else {
      this.next.append(value);
    }
  }
}