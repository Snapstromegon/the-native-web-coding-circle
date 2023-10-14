use std::{cmp::Reverse, collections::BinaryHeap};

const BENCHMARK_SIZE: usize = 1_000_000;

struct RunningMedian {
    min_heap: BinaryHeap<i32>,
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
        if self.min_heap.len() == self.max_heap.len() {
            self.min_heap.push(num);
            self.max_heap.push(Reverse(self.min_heap.pop().unwrap()));
        } else {
            self.max_heap.push(Reverse(num));
            self.min_heap.push(self.max_heap.pop().unwrap().0);
        }
    }

    fn find_median(&self) -> f64 {
        if self.min_heap.len() == self.max_heap.len() {
            (self.min_heap.peek().or(Some(&0)).unwrap()
                + self.max_heap.peek().or(Some(&Reverse(0))).unwrap().0) as f64
                / 2.0
        } else {
            self.max_heap.peek().unwrap().0.into()
        }
    }
}

fn main() {
    // Prepare variables
    let mut medians: Vec<f64> = Vec::with_capacity(BENCHMARK_SIZE);
    let mut random_numbers: Vec<i32> = Vec::with_capacity(BENCHMARK_SIZE);
    for _ in 0..BENCHMARK_SIZE {
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
