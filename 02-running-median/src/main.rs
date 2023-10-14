use std::{cmp::Reverse, collections::BinaryHeap};

const BENCHMARK_SIZE: usize = 1_000_000;

struct RunningMedian {
    min_heap: BinaryHeap<i32>,
    // Hey, isn't it cool that the reversed order is part of the type system?
    max_heap: BinaryHeap<Reverse<i32>>,
}

impl RunningMedian {
    fn new() -> Self {
        RunningMedian {
            min_heap: BinaryHeap::with_capacity(BENCHMARK_SIZE),
            max_heap: BinaryHeap::with_capacity(BENCHMARK_SIZE),
        }
    }

    fn add(&mut self, num: i32) {
        // This solution always keeps the heaps balanced and does the work on insertion. This means that the find_median function is O(1)
        if self.min_heap.len() == self.max_heap.len() {
            // Because of the two lines below, we always know that the max_heap is at least as big as the min_heap
            self.min_heap.push(num);
            self.max_heap.push(Reverse(self.min_heap.pop().unwrap()));
        } else {
            // Because the max_heap is always bigger than the min_heap, we can do this to always get them to the same length
            self.max_heap.push(Reverse(num));
            self.min_heap.push(self.max_heap.pop().unwrap().0);
        }
    }

    fn find_median(&self) -> f64 {
        if self.min_heap.len() == self.max_heap.len() {
            // This is fancy Rust fpr saying "the average of the first element of the min_heap and the first element of the max_heap"
            (self.min_heap.peek().unwrap_or(&0) + self.max_heap.peek().unwrap_or(&Reverse(0)).0)
                as f64
                / 2.0
        } else {
            // We know that the max_heap is always bigger than the min_heap, so we can just take the first element
            // Unwrapping here is safe, because the heap will always have at least one element
            self.max_heap.peek().unwrap().0.into()
        }
    }
}

fn main() {
    // Prepare variables
    let mut medians: Vec<f64> = Vec::with_capacity(BENCHMARK_SIZE);
    let mut random_numbers: Vec<i32> = Vec::with_capacity(BENCHMARK_SIZE);
    for _ in 0..BENCHMARK_SIZE {
        // Using i16 here, because i32 can run into overflows when calculating the median
        random_numbers.push(rand::random::<i16>().into());
    }

    // Create benchmark struct
    let mut running_median = RunningMedian::new();

    // Run benchmark
    let start = std::time::Instant::now();
    for num in random_numbers {
        running_median.add(num);
        medians.push(running_median.find_median());
    }
    let duration = start.elapsed();

    // Print results
    println!("Median: {}, {:?}", running_median.find_median(), duration);
}
