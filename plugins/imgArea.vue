<template>
	<div class="img-contain" v-bind:class='{area:isActive}'>
		<div v-for="(item,index) in imgs" class="image-item">
			<div v-if="!item.url" class="div-add" :style='item.style' @click="addImg(index)">
				<div class="description">{{item.msg}}</div>
			</div>
			<div v-else class="img-show" :style="item.style">
				<img :src="item.url" style="width: 100%; height: 100%;" @click="openImg(index)">
				<div class="close" v-show="item.showDelete" @click="deleteImg(index)"></div>
			</div>
		</div>
	</div>
</template>

<script>
	var example = {
		isActive: false,
	}
	module.exports = {
		props: ["imgs"],
		data: function() {
			return example
		},
		mounted() {
			var imgs = this.imgs
			if (imgs.length == 1) {
				example.isActive = false
			}else{
				example.isActive = true
			}
		},
		methods: {
			addImg(index) {
				var imgs = this.imgs
				uploadImg(function(url) {
					imgs[index].url = url
					console.log("upimg",imgs[index].url)
				})
				this.$emit("getImgs", imgs)
			},
			deleteImg(index){
				var imgs = this.imgs
				delImgs(imgs[index].url)
				imgs[index].url = ""
				this.$emit("getImgs", imgs)
			},
			openImg(index){
				var imgs = this.imgs
				openImage(imgs[index].url)
				this.$emit("getImgs", imgs)
			}
		}
	}
</script>

<style>
	.img-contain {
		padding: 20px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-around;
		margin: 20px;
	}

	.area{
		border: 2px dashed black;
		border-radius: 16px;
	}

	.description {
		z-index: -1;
		font-weight: 100;
		width: 100%;
		height: 100%;
		text-align: center;
	}
	
	.image-item {
		margin: 10px;
		border: 2px solid black;
	}
	
	.image-item:hover{
		background: #E8E8E8;
	}

	.div-add {
		width: 100%;
		height: 100%;
		background: url(/jiwuzao-merchant/img/icons/add.png) no-repeat center;
		background-size: 50px 50px;
		cursor: pointer;
	}

	.img-show{
		position: relative;
	}

	.close {
		width: 20px;
		height: 20px;
		/*方便相对于父元素进行定位*/
		position: absolute;
		top: 10px;
		right: 10px;
		border: 1px solid black;
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.close::before,
	.close::after {
		content: "";
		height: 16px;
		width: 1.5px;
		background: black;
	}

	.close::before {
		transform: rotate(45deg);
		/*进行旋转*/
	}

	.close::after {
		transform: rotate(-45deg);
	}
</style>
