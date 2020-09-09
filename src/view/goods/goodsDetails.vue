<template>
  <div class="goodsDetails-page">
    <!-- 顶部导航 -->
    <section class="position-sticky z100" style="top: 0;" ref="navDom">
      <ul class="row theme-bg com-header white">
        <li class="col row justify-content-center f30 nav-list" id="navListDom">
          <div
            class="p-h-30 30"
            :class="navActiveIndex === 0 && 'active'"
            @click.stop="pageScrollTo(0);"
          >商品</div>
          <div
            class="p-h-30 30"
            :class="navActiveIndex === 1 && 'active'"
            @click.stop="pageScrollTo(1);"
          >评价</div>
          <div
            class="p-h-30 30"
            :class="navActiveIndex === 2 && 'active'"
            @click.stop="pageScrollTo(2);"
          >详情</div>
        </li>
      </ul>
    </section>
    <!-- 轮播图 -->
    <section class="banner-modules" ref="infoDom">
      <swiper
        class="position-relative"
        style="padding-bottom: 80%;"
        ref="mySwiper"
        :options="swiperOption"
      >
        <swiper-slide
          class="h-100"
          v-for="(item, index) in goodsInfo.images"
          :key="'imgList' + index"
        >
          <img :src="$imgBaseUrl + item" alt class="imgCover" />
        </swiper-slide>
        <div class="swiper-pagination" swiperpagination="banner" slot="pagination"></div>
      </swiper>
    </section>
    <!-- 商品信息 -->
    <section class="f30">
      <div class="p-h-30 border-bottom-10-f4">
        <div class="m-v-30 f40 theme-color-red">¥{{goodsInfo.price || 0}}</div>
        <div class="row border-bottom-1-e color-9 p-b-30">
          <div class="col">重量{{goodsInfo.weight || 0}}kg</div>
          <div>月销{{goodsInfo.sales_sum || 0}}箱</div>
        </div>
        <div class="p-v-30">{{goodsInfo.goods_name || '产品名'}}</div>
      </div>
      <!-- 选择规格 -->
      <!-- <div
        class="row p-30 f30 border-bottom-10-f4 hover-bg-gray"
      >
        <div class="col" id="selectedAttrDom">选择规格数量</div>
        <div class="icon-moreRight"></div>
      </div>-->
      <!-- 产品参数 -->
      <div class="p-h-30 f30 border-bottom-10-f4">
        <div class="border-bottom-1-e p-v-30">产品参数</div>
        <div class="p-v-30 params-table" v-html="goodsInfo.parameter"></div>
      </div>
      <!-- <div class="p-h-30 f30 border-bottom-10-f4">
            <div class="border-bottom-1-e p-v-30">产品参数</div>
            <ul class="p-v-20 f30">
                <li class="row m-v-20">
                    <div class="col color-9">包装数量</div>
                    <div>1.8</div>
                </li>
                <li class="row m-v-20">
                    <div class="col color-9">规格</div>
                    <div>内容</div>
                </li>
                <li class="row m-v-20">
                    <div class="col color-9">规格</div>
                    <div>内容</div>
                </li>
                <li class="row m-v-20">
                    <div class="col color-9">规格</div>
                    <div>内容</div>
                </li>
            </ul>
      </div>-->
      <!-- 商品评价 -->
      <div class="border-bottom-10-f4" ref="commentListDom">
        <div
          class="row p-30 f30 border-bottom-1-e hover-bg-gray"
          id="goodsCommentModulesDom"
           @click.stop="$openToApp();"
        >
          <div class="col" id="commentTitleDom">商品评价（共{{totallCommentNumber}}条）</div>
          <p class="f30">更多</p>
          <div class="icon-moreRight"></div>
        </div>
        <div class="swiper-container goods-comment-modules" swipertype="comment">
          <swiper class="position-relative" :options="swiperOption_comment">
            <swiper-slide
              class="m-r-30 m-v-30 p-h-30 p-v-30 f30 border-bottom-1-e"
              v-for="(item, index) in commentList"
              :key="'comments' + index"
            >
              <div class="d-flex">
                <div class="img-box flex-shrink-0">
                  <img
                    :src="(/http/.test(item.head_pic) ? item.head_pic : $imgBaseUrl + item.head_pic)"
                    alt
                    class="imgCover"
                  />
                </div>
                <div class="col p-h-30 text-over-one">
                  <span>{{item.nickname}}</span>
                  <p class="text-over-one">{{item.attr_key_name}}</p>
                </div>
                <div class="row star-list-modules" id="starListDom">
                  <div
                    class="position-relative icon-star active"
                    v-for="(item, index) in item.star"
                    :key="'star' + index"
                  >
                    <img
                      src="~@/assets/icon/icon-comment-start-active.png"
                      class="imgCover d-block"
                    />
                  </div>
                </div>
              </div>
              <div class="m-v-30 m-b-5 text-over-one">{{item.desc}}</div>
              <p>{{item.add_time}}</p>
            </swiper-slide>
            <swiper-slide
              class="m-auto"
              style="width: auto; background-color: initial;"
              v-if="commentList.length > 1"
            >
              <p class="m-h-50 to-more" @click.stop="$openToApp();">更多></p>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <!-- 富文本：图文列表 -->
      <section class="goodsInfo-html" ref="detailsDom" v-html="goodsInfo.content"></section>
    </section>
    <!-- 底部购买条 -->
    <section style="height: 2.5rem;">
      <div class="fixed-bottom z200 d-flex footer-buy-bar" @click.stop="$openToApp();">
        <div class="position-relative col-4 d-flex icon-btn-list">
          <a
            href="tel: 4000004866"
            class="col row flex-column justify-content-center bg-white com-txtIcon-btn"
          >
            <div class="iconfont">
              <img src="~@/assets/icon/icon-com-server.png" alt />
            </div>
            <p class="txt" style="color: #666666;">客服</p>
          </a>
          <a
            class="col row flex-column justify-content-center bg-white com-txtIcon-btn"
            style="margin-left: 1px;"
          >
            <div class="iconfont">
              <img src="~@/assets/icon/icon-com-shopCart-black.png" alt />
            </div>
            <p class="txt" style="color: #666666;">购物车</p>
          </a>
        </div>
        <div class="col row text-center color-f">
          <div class="col-6 p-v-30 theme-bg">加入购物车</div>
          <div class="col-6 p-v-30 theme-bg-red">立即购买</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import '@/assets/css/swiper.min.css';

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: false,
        freeModeMomentumBounce: true,
        resistanceRatio: 0.9,
        touchReleaseOnEdges: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        pagination: {
          el: '[swiperpagination="banner"]'
        },
        autoplay: false
      },
      swiperOption_comment: {
        //评论轮播
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: true,
        freeModeMomentumBounce: true,
        resistanceRatio: 0.9,
        touchReleaseOnEdges: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        autoplay: false
      },
      goodsInfo: {},
      commentList: [],
      totallCommentNumber: 0,
      navActiveIndex: 0
    };
  },
  mounted() {
    let goodsID = this.$route.query.goodsID;

    this.getGoodsInfoByID(goodsID);
    this.getGoodsCommentListByID(goodsID); //获取商品评价
  },
  methods: {
    testMask(){
      this.$showMask();
    },
    //获取商品信息
    getGoodsInfoByID(goodsID) {
      this.$ajax({
        urlKey: "getGoodsDetailsByID",
        post: {
          goods_id: goodsID
        },
        success: ret => {
          if (ret.code === 1) {
            var oData = ret.result;
            this.goodsInfo = oData;
            this.addEvt_pageScroll();
          }
        }
      });
    },

    // 获取商品评价
    getGoodsCommentListByID(goodsID) {
      this.$ajax({
        urlKey: "getGoodsCommentByID",
        post: {
          goods_id: goodsID
        },
        success: ret => {
          if (ret.code === 1) {
            this.commentList = ret.result.comments;
            this.totallCommentNumber = ret.result.total_num;
            this.addEvt_pageScroll();
          }
        }
      });
    },

    //滚动到指定页面
    pageScrollTo(index) {
      window.scrollTo({
        top: this.offsetTopList[index],
        behavior: "smooth"
      });
    },

    //滚动监听
    addEvt_pageScroll() {
      var loadedTimes = this.loadedTimes || (this.loadedTimes = 1);

      if (loadedTimes === 2) {
        this.$nextTick(() => {
          let offsetTop_nav = this.$refs.navDom.offsetTop;
          let refsList = ["infoDom", "commentListDom", "detailsDom"];
          let hadScrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            (document.body && document.body.scrollTop);

          this.$nextTick(() => {
            this.offsetTopList = refsList.map(item => {
              return (
                this.$refs[item].offsetTop - offsetTop_nav + hadScrollTop + 20
              );
            });

            console.log(this.offsetTopList);

            document.addEventListener(
              "scroll",
              this.changeNavActiveStatus,
              true
            );
            
          });

        });
      } else {
        this.loadedTimes += 1;
      }
    },

    //改变navlist的选中状态
    changeNavActiveStatus(e) {
      let navActiveIndex;
      let offsetTopList = this.offsetTopList;

      let scrollTop =
        e.target.documentElement.scrollTop || e.target.body.scrollTop;

      if (scrollTop >= offsetTopList[0] && scrollTop < offsetTopList[1]) {
        navActiveIndex = 0;
      } else if (
        scrollTop >= offsetTopList[1] &&
        scrollTop < offsetTopList[2]
      ) {
        navActiveIndex = 1;
      } else if (scrollTop >= offsetTopList[2]) {
        navActiveIndex = 2;
      }

      if (navActiveIndex !== this.navActiveIndex) {
        this.navActiveIndex = navActiveIndex;
      }
      //   console.log(scrollTop);
    }
  }
};
</script>

<style lang="css">
/* --------------------
  goodsDetails-page 商品详情
------------------------- */
.goodsDetails-page {
  background-color: #fff;
}

.goodsDetails-page .banner-modules .swiper-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}
.goodsDetails-page .swiper-pagination-bullet {
  background: rgba(255, 255, 255, 0.8);
}
.goodsDetails-page .swiper-pagination-bullet-active {
  background: #fe7b14;
}

.goodsDetails-page .params-table tr td {
  font-size: 0.75rem;
  line-height: 1.6rem;
}

.goodsDetails-page .params-table tr td:first-child {
  color: #999;
}

.goodsDetails-page .params-table tr td:last-child {
  text-align: right;
}

.goodsDetails-page .goodsInfo-html img {
  display: block !important;
}

.goodsDetails-page .footer-buy-bar .icon-btn-list {
  background-color: #ddd;
}
.goodsDetails-page .footer-buy-bar .icon-btn-list::before {
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
  right: 0;
  content: "";
  display: block;
  height: 1px;
  background-color: #ddd;
}

/* 模块：商品评价 */
.goods-comment-modules .img-box {
  width: 2.25rem;
  height: 2.25rem;
  overflow: hidden;
  border-radius: 50%;
}

.goods-comment-modules .to-more {
  width: 3.2rem;
  line-height: 3.2rem;
  text-align: center;
  border-radius: 50%;
  background-color: #fda100;
  font-size: 0.9rem;
  font-weight: bolder;
  color: #fff;
}
.goods-comment-modules .swiper-slide:first-child {
  margin-left: 0.75rem;
}
.goods-comment-modules .swiper-slide {
  width: 90%;
  background-color: #f2f2f2;
  border-radius: 0.4rem;
}

/* 模块：五星 */

.star-list-modules .icon-star {
  width: 1.3rem;
  height: 1.3rem;
}

.star-list-modules .icon-star .imgCover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 0.9rem;
  height: 0.9rem;
}

.star-list-modules .icon-star .imgCover:nth-child(1) {
  display: none;
}

.star-list-modules .icon-star.active .imgCover:nth-child(2) {
  display: none;
}

.star-list-modules .icon-star.active .imgCover:nth-child(1) {
  display: block;
}
</style>