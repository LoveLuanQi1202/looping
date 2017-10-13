;(function(root, factory, plugin) {
	factory(root.Zepto, plugin)
})(window, function($, plugin) {
	var __DEFAULTS__={
		autoLoop:true,
		loopTime:5000
	};
	var __PROTOTYPE__={
			init:function(){
				this.$carousel = $("#carousel"),
				this.$inner = $("#carousel .inner"),
				this.$lis = $("#carousel .inner li"),
				this._vm = window.innerWidth,
				this.slide = this._vm *0.3;
				this.startX,
				this.endX,
				this.distX,
				this.cleft=0,
				this._dir,
				this.cindex = 0,
				this.total = this.$lis.length;
				
			},
			_xlh:function(){
				this.$carousel.prepend("<ul id='indicators'></ul>");
				this.$indicators = $("#indicators");
				for(var i=0;i<this.total;i++){
					this.$indicators.append("<li></li>");
				};
				this.$indicate=this.$indicators.children("li");
				this.$indicate.eq(0).addClass("active");
			},
			_bind:function(){
				
				this.$carousel.on("touchstart", this.startcb.bind(this));
				this.$carousel.on("touchmove", this.movecb.bind(this));
				this.$carousel.on("touchend", this.endcb.bind(this));
				if(this.autoLoop){
					this.loop();
				}
			},
			startcb:function(e) {
				if(this.autoLoop){
					clearInterval(this.interval);
				}
				this.startX = e.touches[0].clientX;
				this.cleft = this.$inner.offset().left;
				this.cindex = Math.ceil(-this.cleft / this._vm);
			},
			movecb:function (e) {
				this.endX = e.touches[0].clientX;
				e.preventDefault();
				this.distX = this.startX - this.endX;
				this._dir = this.distX > 0 ? "L" : "R";
				if(this.cindex == 0 && this._dir == "R" || this.cindex == this.total - 1 && this._dir == "L") {
					return;
				}
				this.$inner.css({
					left: -this.distX + this.cleft + 'px'
				});
			},
			endcb:function() {
				var abs = Math.abs(this.distX),
					_left;
				if(abs > this.slide) {
					if(this._dir == "L" && this.cindex != this.total - 1) {
						_left = -(this.cindex+1)*this._vm;
						this.$indicate.eq(this.cindex+1).addClass("active").siblings().removeClass("active");
					} else if(this._dir == "R" && this.cindex != 0) {
						_left = -(this.cindex-1)*this._vm;
						this.$indicate.eq(this.cindex-1).addClass("active").siblings().removeClass("active");
					}
				} else {
					_left = this.cleft;
				}
				this.$inner.css({
					left: _left + 'px'
				});
				if(this.autoLoop){
					this.loop();
				}
			},
			loop:function(){
				this.interval = setInterval(function(){
					this.cleft = this.$inner.offset().left
					this.cindex = Math.ceil(-this.cleft / this._vm);
					if(this.cindex < this.total-1){
						this.$inner.css({
							left: this.cleft-this._vm + 'px'
						});
						this.$indicate.eq(this.cindex+1).addClass("active").siblings().removeClass("active");
					}else if(this.cindex=this.total-1){
						this.$inner.css({
							left: 0 + 'px'
						});
						this.$indicate.eq(0).addClass("active").siblings().removeClass("active");
					}
					
					
				}.bind(this),this.loopTime);
			}
			
		}
	
	$.fn[plugin] = function(ops) {
		$.extend(this,__PROTOTYPE__,__DEFAULTS__,ops);
		console.log(this);
		this.init();
		this._xlh();
		this._bind();
	}
}, "myslider")