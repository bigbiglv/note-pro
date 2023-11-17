# 音频上下文 `Web Audio API`
https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API
* 使用构造函数创建一个`audioContext`对象, 音频上下文
* 通过`audioContext`创建一个音频源`createBufferSource()`
* 通过`audioContext`创建各种节点
* 将`audioBuffer`赋值给音频源
* 音频源通过`connect`连接其他节点，最后一个节点连接输出源`destination`
* 谷歌浏览器单个标签最多六个音频上下文
* 浏览器的自动播放策略通常要求显式权限或者用户与页面产生互动后，才允许脚本触发音频播放
```js
const AudioContext = window.AudioContext || window.webkitAudioContexta
const audioContext = new AudioContext(options)
```
* `options? => { latencyHint?, sampleRate? }`

参数|说明
:--|:--
`latencyHint` `<String>` | `balanced` : 浏览器在选择延迟值时会平衡音频输出延迟和功耗 <br> `interactive`(默认值) : 高效但增加功耗，多用于涉及交互的游戏、音频等 <br> `playback` : 以延迟为代价最小化功耗来最大化播放时间，用于播放音乐 
`sampleRate` `<Number>` | 采样率


## `AudioContext` 实例属性

### 播放状态 `state`
参数|说明
:--|:--:
`running` | 播放状态 | 
`suspended` | 停止状态 | 
`closed` | 已关闭 | 
```js
audioContext.state
// 监听状态改变
audioContext.onstatechange(()=>{
  console.log(audioContext.state)
})
```

### 播放进度 `currentTime`
```js
audioContext.currentTime
```


## `AudioContext` 实例方法

### 停止 `close()` `<Promise>`
* 关闭音频释放资源停止播放，并非暂停且会**丢失进度** 
```js
audioContext.close().then()
```
### 暂停 `suspend()` `<Promise>`
* 暂停音频
```js
// 先检查状态
if (audioContext.state === 'running')
  audioContext.suspend().then(() => {
    // do something
  })
```

### 播放 `resume()` `<Promise>`
* 恢复播放音频
* 浏览器不允许一上来就使用播放音频，一开始需要手动触发调用一次 `audioContext.resume()`
```js
// 先检查状态
if (audioContext.state === 'running')
  audioContext.resume().then(() => {
    // do something
  })
```

### 转格式 `decodeAudioData()`
* 将`arrayBuffer`转为`audioBuffer`
* 这是从音轨为 `Web Audio API` 创建音频源的首选方法
* 此方法仅适用于完整的文件数据，不适用于音频文件数据的片段
* 通常是从`XMLHttpRequest`, `fetch()`中抓取的`FileReader`, `responseType='arraybuffer'`
* `decodeAudioData(arrayBuffer, successCallback, errorCallback)`
```js
audioContext.decodeAudioData(arrayBuffer, (buffer)=>{
  console.log(buffer)
  // 将AudioBuffer赋值给音频源
  source.buffer = buffer 
})
```
---
## 节点 `AudioNode`
* 可以通过工厂函数或构造函数创建（推荐）
* 第一个为音频源
* 由音频源开始，各个节点像链条一样通过`connect`连接，最后连接输出口`audioContext.destination`
* `destination`通常代表一个实际的音频渲染设备，例如设备的扬声器
```js
source.connect(NodeA)
NodeA.connect(NodeB)
NodeB.connect(Nodec)
NodeC.connect(audioContext.destination)
```

### 连接节点 `connect`
* 连接某个节点
```js
// 从音频源开始 destination结束
source.connect(analyser)
analyser.connect(gainNode)
gainNode.connect(audioContext.destination)
```

### 断开节点 `disconnect()`
* 断开某个节点
```js
// 断开音量模块
audioContext.disconnect(gainNode)
```

### 音频缓冲区 `AudioBuffer`
* `new AudioBuffer(options? => { length: Number })`
* 多用于保存小的音频片段，通常少于 45 秒
* 对于更长的声音，使用 `MediaElementAudioSourceNode` 更合适
* `decodeAudioData` 能将 `arrayBuffer` 转为 `audioBuffer` 格式
```js
const audioBuffer = new AudioBuffer(options)
const audioBuffer = audioContext.createBuffer(numOfChannels, length, sampleRate)
```


### 音频源 `AudioBufferSourceNode`
* 可用于播放`AudioBuffer`对象中包含的音频数据，`AudioBuffer` 适用于**短音频**
* 同样的音频只能播放一次，调用`start()`后要再次播放相同的声音，就**必须创建一个新节点**
* 创建成本低，可以用完就丢，需要的时候再重新创建
* `buffer` `<AudioBuffer>`: 传入音频的`audioBuffer`
* `playbackRate` `<Number>`: 倍速
* `loop: Boolean` `<Boolean>`: 循环播放
* `loopStart` `<Number>`: 开始循环时间
* `loopEnd` `<Number>`: 停止循环时间
* `detune`: 振荡失谐
* `start(when?, offset?, duration?)`: 播放音频
   * `when`: 开始播放时间
   * `offset`: 偏移量
   * `duration`: 持续时间
* `stop()`：停止音频

```js
const source = new AudioBufferSourceNode(audioContext, options)
const source = audioContext.createBufferSource()
source.buffer = AudioBuffer
source.playbackRate.value = 1.5 // 1.5倍速
source.start() // 播放音频
source.stop() // 停止音频
```

### 媒体元素音频源 `MediaElementAudioSourceNode`
* 适用于长音频流式播放
* 传入`audio`或者`video`元素，从中操作音频
* `audio`原本的功能不受影响，只是让`Web Audio API`能够访问到声音
* 播放/暂停媒体仍然可以通过媒体元素 `API` 和播放器控件来完成
* 如果音频来源是其他域的需要添加`crossorigin="anonymous"`
   * `<audio src="xxx" controls crossorigin="anonymous"></audio>`
```js
const audio = deocment.createElement('audio')
const audioContext
audio.addEventListener("play", () => {
  const source = new MediaElementAudioSourceNode(audioContext, { mediaElement: audio })
  // 从 audio标签获取源并传到audioContect上下文钟
  const source = audioContext.createMediaElementSource(audio)
})
```

### 麦克风音频源 `MediaStreamAudioSourceNode`


### 音量节点 `GainNode`
* `new GainNode(audioContext<AudioContext>, options? => { gain: Number })`
* `gain` : 音量
```js
const gainNode = new GainNode(audioContext, options)
const gainNode = audioContext.createGain();
// 设置音量
gainNode.gain.value = 10
```

### 频率可视化 `AnalyserNode`
* 可用于公开音频时间和频率数据并创建数据可视化
* 属性
   * `frequencyBinCount`
      * 可视化使用的数据值的数量
      * `fftSize`的一半 
      * 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192
   * `fftSize`
      * 可修改值用于限制可视化数组长度
      * 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768。默认为2048
* 获取频率
   * `getByteFrequencyData(array)`
      * 返回 0-255 的 `Uint8Array`(性能)
      * 元素值 0 到 255 范围内的整数组成
      * 对已有(传入)数组进行赋值， 不是返回新的数组
   * `getFloatFrequencyData(array)`
      * 返回 0-22050 的 `Float32Array`(精度)
      * 数组长度是`frequencyBinCount`也就是`fftSize`的一半
```js
const analyser = new AnalyserNode(audioContext, options)
const analyser = audioContext.createAnalyser();
// 规定长度为 512 限制柱体数量
analyser.fftSize = 512;

const bufferLength = analyser.frequencyBinCount;
// 新建一个Uint8Array用于存放可视化数组
const dataArray = new Uint8Array(bufferLength);

// 获取canvas画布
const canvas = decument.getElementById('canvas')
const ctx = canvas.getContext('2d')
// 获取画布宽高
const width = canvas.width
const height = canvas.height
// 矩形柱体的宽高
let barWidth = width / bufferLength * 1.5;
let barHeight;
// 绘画方法
function draw() {
  requestAnimationFrame(draw)
  // 获取可视化数据 赋值给 dataArray
  analyser.getByteFrequencyData(dataArray)
  // 每次绘画前都先清除画布
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  // 循环绘制个数为 bufferLength 的矩形
  for(var i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i]
    // 绘制矩形 
    // 矩形柱体随机色
    let r = barHeight + 25 * (i / bufferLength);
    let g = 250 * (i / bufferLength);
    let b = 50;
    ctx.fillStyle = `rgb(${r},${g},${b})`
    // 前两个参数是矩形右上角的x y
    // 后两个参数是矩形的宽高
    ctx.fillRect(x, height - barHeight, barWidth, barHeight)
  }
}
// 开始绘制
draw()
```

### 混响 `createConvolver()`