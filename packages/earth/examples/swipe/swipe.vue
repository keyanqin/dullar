<template>
  <div>
    <h2>yn-swipe</h2>
    <div class="box">
      <h3>左右滑动轮播图 - {{ activeIndex }}/{{ length }}</h3>
      <yn-swipe ref="swipe1" indicatorType="number" @ticking="handleTicking">
        <yn-swipe-item>
          <div>
            <img src="./images/apple-1.jpg" />
          </div>
        </yn-swipe-item>
        <yn-swipe-item>
          <img src="./images/apple-2.jpg" />
        </yn-swipe-item>
        <yn-swipe-item>
          <img src="./images/apple-3.jpg" />
        </yn-swipe-item>
        <yn-swipe-item>
          <img src="./images/apple-4.jpg" />
        </yn-swipe-item>
      </yn-swipe>
      <div class="api">
        <span>对外接口</span>
        <yn-button @click="prev('swipe1')">prev</yn-button>
        <yn-button @click="next('swipe1')">next</yn-button>
      </div>
    </div>
    <div class="box">
      <h3>上下滑动轮播图</h3>
      <yn-swipe vertical ref="swipe2">
        <yn-swipe-item>
          <img src="./images/apple-1.jpg" />
        </yn-swipe-item>
        <yn-swipe-item>
          <img src="./images/apple-2.jpg" />
        </yn-swipe-item>
        <yn-swipe-item>
          <img src="./images/apple-3.jpg" />
        </yn-swipe-item>
        <yn-swipe-item>
          <img src="./images/apple-4.jpg" />
        </yn-swipe-item>
      </yn-swipe>
      <div class="api">
        <span>对外接口</span>
        <yn-button @click="prev('swipe2')">prev</yn-button>
        <yn-button @click="next('swipe2')">next</yn-button>
      </div>
    </div>
    <div class="box">
      <h3>酒店轮播图</h3>
      <yn-swipe @click="handleClick" ref="swipex" indicatorType="number">
        <yn-swipe-item v-for="(item, index) in images" :key="index" :resource="item">
          <div>
            <img :src="item" />
          </div>
        </yn-swipe-item>
      </yn-swipe>
      <yn-popup class="background" @beforeEnter="beforeEnter" @afterLeave="afterLeave" @afterEnter="afterEnter" v-model="popup" position="middle">
        <template v-if="entered">
          <yn-swipe ref="swipey" @click="handleClick" indicatorType="number" :autoPlay="false">
            <yn-swipe-item v-for="(item, index) in images" :key="index" :resource="item">
              <div>
                <img :src="item" />
              </div>
            </yn-swipe-item>
          </yn-swipe>
        </template>
      </yn-popup>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "YnSwipePage",
  data() {
    return {
      activeIndex: 0,
      length: 0,
      popup: false,
      entered: false,
      currentIndex: -1,
      images: [
        "https://pavo.elongstatic.com/i/Hotel350_350/JcPRJpObzW.jpg",
        "https://img.huazhu.com/cos/mdm/HN02000710/a9104687-333c-4930-92ec-930c95936876/2021-09-10-16-56-26-529.jpg",
        "http://pavo.elongstatic.com/i/Hotel350_350/0004XDSx.jpg",
        "http://pavo.elongstatic.com/i/Hotel350_350/0004XDSx.jpg",
        "http://pavo.elongstatic.com/i/Hotel350_350/000ciKER.jpg"
      ]
    };
  },
  methods: {
    handleTicking(e) {
      this.activeIndex = e.activeIndex;
      this.length = e.length;
    },
    prev(ref) {
      console.log(ref);
      this.$refs[ref].prev();
    },
    next(ref) {
      this.$refs[ref].next();
    },
    handleClick(index) {
      console.log("当前是第几个", index);
      this.popup = true;
      this.currentIndex = index;
    },
    beforeEnter() {
      this.$refs.swipex.stop();
    },
    afterEnter() {
      this.entered = true;
    },
    afterLeave() {
      this.$refs.swipex.play();
    }
  }
};
</script>
<style type="text/css">
.box {
  margin: 20px auto;
  border-bottom: 1px solid #e4e4e4;
}
.api {
  height: 100px;
  line-height: 100px;
}
.background {
  background:  rgba(0, 0, 0, 0) !important;
  /* width: 50% !important; */
}
img {
  width: 100%;
  height: 240px;
}
</style>
