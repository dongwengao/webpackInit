import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

window.onload = async () => {
    const xs = [1.2, 2.3, 3.9, 4.7]
    const ys = [1.3, 3.5, 5.1, 7.8]
    tfvis.render.scatterplot({name: '线性回归训练集'}, {
        values: xs.map((x, i) => ({x, y: ys[i]}))
    }, {
        xAxisDomain: [0, 5], yAxisDomain: [0, 8]
    });

    // 初始化模型
    const model = tf.sequential();
    model.add(tf.layers.dense({
        units: 1, // 定义神经元个数,只需一个神经元
        inputShape: [1] // 定义输入数据的形状,含有一个数据的一维数组
    }))
    // 模型设置损失函数
    model.compile({loss: tf.losses.meanSquaredError, optimizer: tf.train.sgd(0.01)});
    const inputs = tf.tensor(xs);
    const labels = tf.tensor(ys);
    await model.fit(inputs, labels, {
        batchSize: 1, epochs: 20, callbacks: tfvis.show.fitCallbacks({name: '训练过程'},
            ['loss'])
    });
    const output = model.predict(tf.tensor([[100], [200], [20]]))
    output.print()
    console.log(output.dataSync())
}