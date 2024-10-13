import * as tf from '@tensorflow/tfjs'

// 零维数组
const t0 = tf.tensor(1);
t0.print()
console.log(t0)

const t1 = tf.tensor([1, 2]);
t1.print()
console.log(t1);

const t2 = tf.tensor([[1], [3]])
t2.print()
console.log(t2)

const t3 = tf.tensor([[[1, 2], [3, 4]], [[1, 2], [3, 4]]])
t3.print()
console.log(t3)

const input = tf.tensor([1, 2, 3, 4])
const weight = tf.tensor([[5, 6, 7, 8], [1, 2, 3, 4], [9, 8, 2, 1], [3, 6, 1, 8]])

const result = weight.dot(input)
result.print()