# drag-calendar
一个可拖拽的日历组件，[开发介绍](https://juejin.im/post/5ac322876fb9a028c71ea27e)

### 项目效果：
![image](https://gw.alipayobjects.com/zos/rmsportal/vmcQNKFkrxJGuHghVWzs.gif)

### 运行demo
运行demo请clone项目并进入项目的demo目录

    tnpm install

    tnpm start

然后访问 localhost:8000/ 就能看到。

### 使用

    npm install calendar --save

然后在你的项目里

    import Calendar from 'drag-calendar';

然后在render的时候传入一些参数，例如

```javascript
<Calendar
    monthStr="2018-04"
    eventList={eventList}
    eventForm={(event, closePopover) => {
    return <CustomForm
      event={event}
      closePopover={closePopover}
      onChangeTime={this.onChangeTime}
      deleteEvent={this.deleteEvent}
    />
    }}
    onChangeTime={this.onChangeTime}
    deleteEvent={this.deleteEvent}
    createNewEvent={this.createNewEvent}
/>
```

### 参数列表
##### draggable(可选)
是否有拖动的效果，默认为true

##### popoverControl(可选)
是否需要页面点击清理popover，默认为true，这个设置为false之后，eventForm的第二个参数会失效哈。

##### monthStr
当前展示几月份的，格式"YYYY-MM"

##### eventList
已经定义的事件列表，数组格式，具体格式如下，会根据userId来随机渲染一种颜色

```javascript
  const eventList = [{
    id: 12,
    startTime: "2018-04-4",
    endTime: "2018-04-15",
    displayName: "（主）小鹿",
    userId: 1,
  }];
```

##### eventForm
一个函数，支持传入自定义的form，自定义form写法参照我的demo

函数有两个参数，event为点击的时间，closePopover为清理这个popover的callback

##### onChangeTime
改变事件的函数

函数有3个参数，分别为事件id，事件startTime，事件endTime

##### deleteEvent
删除事件的函数

函数有1个参数，为事件id

##### createNewEvent
创建事件的函数，函数有2个参数，分别为开始时间和结束时间

### changeMonth
点击左右切换日期，我会将新的monthStr传出来，让外部传入，这个接口主要是外部可能需要重新请求数据

### children(可选)
组件可以传入children传入渲染

### dateType(可选)
日历支持粒度切换，默认为'YYYY-MM-DD'，支持传入'YYYY-MM-DD HH:mm:ss'或者'YYYY-MM-DD HH:mm'

## tip
0.0.4升级功能：
 - 支持配置draggable,popoverControl,children以及dateType。各参数功能查看以上文档
 - 拖拽速度调优了