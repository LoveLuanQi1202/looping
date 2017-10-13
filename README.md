# looping
    一个轮播图插件
# Useage
 * 需要依赖zepto
 * 在要绑定的轮播图上写上id=#carousel
 * 调用$("#carousel").myslider()
 * 需要轮播图是如下结构  
* 1.包裹层#carousel 
* -2.轮播图ul 
* -3.用于显示每页的li 
* -4.用于显示图片的img
    
```html
  <div id="carousel">
    <ul class="inner">
      <li class="section">
        <img >
      </li>
    </ul>
  </div>
```
    
# Config 
* 可以自定义参数
* 1.autoLoop:Boolean 是否自动播放,默认为true
* 2.loopTime:int 单位为ms的整数,默认为5000ms
```javascript
  $("#carousel").myslider({
        autoLoop:true,
        loopTime:1000
  })
```
