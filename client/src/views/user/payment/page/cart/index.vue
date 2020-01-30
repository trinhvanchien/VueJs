<template>
  <div class="ct cart">
    <!-- START: WHEN CART EMPTY -->
    <div class="d_none">
      <empty-component />
    </div>
    <!-- END: WHEN CART EMPTY -->
    <!-- START: WHEN CART HAVE PRODUCT -->
    <div class="info mb_3">
      <span>Thông tin giỏ hàng</span>
    </div>
    <div class="notification p_3 mb_3">
      <span>Vui lòng chọn 1 trong số các gói nâng cấp phía dưới</span>
    </div>
    <div class="r">
      <div class="c_lg_9 c_md_12">
        <div class="wrap d_flex justify_content_between mb_3 text_center">
          <div
            class="package px_3 py_4"
            v-for="(item, index) in packages"
            :key="index"
          >
            <div
              class="package--name d_flex align_items_center flex_column mb_3"
            >
              <!--START: ICON FOR PACKAGE FREE-->
              <div v-if="item.name.toLowerCase() === 'free'">
                <icon-base
                  icon-name="remove"
                  width="50"
                  height="50"
                  viewBox="0 0 60 60"
                >
                  <icon-diamond />
                </icon-base>
              </div>
              <!--END: ICON FOR PACKAGE FREE-->
              <!--START: ICON FOR PACKAGE PRO-->
              <div v-else-if="item.name.toLowerCase() === 'pro'">
                <icon-base
                  icon-name="remove"
                  width="50"
                  height="50"
                  viewBox="0 0 60 60"
                >
                  <icon-diamond />
                </icon-base>
                <icon-base
                  icon-name="remove"
                  width="50"
                  height="50"
                  viewBox="0 0 60 60"
                >
                  <icon-diamond />
                </icon-base>
                <icon-base
                  icon-name="remove"
                  width="50"
                  height="50"
                  viewBox="0 0 60 60"
                >
                  <icon-diamond />
                </icon-base>
              </div>
              <!--END: ICON FOR PACKAGE PRO-->
              <!--START: ICON FOR PACKAGE PAGE CARE-->
              <div v-else>
                <icon-base
                  icon-name="remove"
                  width="50"
                  height="50"
                  viewBox="0 0 60 60"
                >
                  <icon-diamond />
                </icon-base>
                <icon-base
                  icon-name="remove"
                  width="50"
                  height="50"
                  viewBox="0 0 60 60"
                >
                  <icon-diamond />
                </icon-base>
              </div>
              <!--END: ICON FOR PACKAGE PAGE CARE-->
              <input type="radio" hidden name="name" :id="item.name" />
              <label class="mt_2" :for="item.name">{{ item.name }}</label>
            </div>
            <div class="package--info px_3">
              <div class="package--info-account package--inline">
                <!-- TODO: giới hạn tài khoản facebook sử dụng -->
                <span v-if="item.name.toLowerCase() !== 'pro'">1 </span>
                <span v-else>2 </span>
                <small>tài khoản</small>
              </div>
              <div class="package--info-post package--inline">
                <span>{{ item.limit.post }} </span>
                <small>bài đăng / ngày</small>
              </div>
              <div
                class="package--info-schedules package--inline"
                v-if="item.name.toLowerCase() !== 'free'"
              >
                <small>Page không giới han</small>
              </div>
              <div
                class="package--info-schedules package--inline"
                v-if="item.name.toLowerCase() !== 'free'"
              >
                <small>Group không giới han</small>
              </div>
              <div
                class="package--info-schedules package--inline"
                v-if="item.name.toLowerCase() === 'pro'"
              >
                <small>Hoot university</small>
              </div>
              <div
                class="package--info-schedules package--inline"
                v-if="item.name.toLowerCase() === 'pro'"
              >
                <small>Hỗ trợ 24/7</small>
              </div>
            </div>
            <div class="package--price px_3 mb_3">
              <div class="package--price-original py_3">
                <span
                  class="number"
                  :class="
                    item.price.one.promotional &&
                    item.price.one.promotional !== 0
                      ? ''
                      : ''
                  "
                  >{{ item.price.one.original }}</span
                >
                <span> đ /tháng</span>
              </div>
              <div
                class="package--price-promotional d_none"
                :class="
                  item.price.one.promotional && item.price.one.promotional !== 0
                    ? ''
                    : 'opa'
                "
              >
                <span class="number">{{ item.price.one.promotional }}</span>
                <span> đ /tháng</span>
              </div>
            </div>
            <div class="package--action">
              <button
                v-if="item.name.toLowerCase() === 'free'"
                @click="upgradePackage"
              >
                Nâng cấp
              </button>
              <button v-else @click="choosePackage(item)">Gia hạn</button>
            </div>
          </div>
        </div>
        <!-- START: UPGRADE PACKAGE -->
        <div v-if="isShowUpgradePackage === true">
          <div class="package--upgrade py_3 px_2">
            Bạn đang sử dụng gói miễn phí của hệ thống, vui lòng chọn gói nâng cấp để sử dụng được những tính năng khác và đầy đủ hơn.
          </div>
        </div>
        <!-- END: UPGRADE PACKAGE -->
        <!-- START: OPTION -->
        <div v-if="packageSelected.length > 0">
          <!-- START: SELECT FOR MONTH -->
          <div class="title d_flex align_items_center mb_3">
            <span class="mr_2">Lựa chọn thanh toán</span>
            <small>( gói {{ packageInfo.name }} )</small>
          </div>
          <div class="option d_flex align_items_center justify_content_between">
            <div
              class="option--item"
              v-for="(exp, comp) in packageSelected"
              :key="comp"
            >
              <label
                :for="exp.title"
                class="radio--custom"
                @click="showPricePackage(exp)"
              >
                <input type="radio" :id="exp.title" name="expire" />
                <span class="ml_2">{{ exp.title }} tháng</span>
              </label>
            </div>
          </div>
          <!-- START: SELECT FOR MONTH -->
          <!-- START: BUY POST -->
          <div class="more mt_3 mb_3">
            <div class="title mb_3">
              <span>mua thêm</span>
            </div>
            <div class="more--wrap">
              <div class="more--item d_flex align_items_center">
                <div class="desc">
                  <span
                    >Số bài đăng <small>( số lần mua bé nhất là 10 )</small>
                  </span>
                </div>
                <div class="amount ml_5">
                  <button class="mr_2" @click="reductionPost">-</button>
                  <input
                    type="text"
                    readonly
                    v-model="number"
                    class="text_center"
                  />
                  <button class="ml_2" @click="increasePost">+</button>
                </div>
              </div>
            </div>
          </div>
          <!-- END: BUY POST -->
        </div>
        <!-- END: MORE OPTION -->
      </div>
      <!-- START: PRICE ORDER -->
      <div class="c_lg_3 c_md_12">
        <div class="wrap">
          <div class="box mb_1">
            <div class="d_flex align_items_center justify_content_between mb_1">
              <span class="box--title">Gia hạn</span>
              <span class="box--price">{{ price }} đ</span>
            </div>
            <div class="d_flex align_items_center justify_content_between">
              <span class="box--title">Mua thêm</span>
              <span class="box--price">{{ money }} đ</span>
            </div>
          </div>
          <div
            class="box d_flex align_items_center justify_content_between mb_3"
          >
            <span class="box--title">Thành tiền</span>
            <span class="box--total">{{ Number(price + money) }} đ</span>
          </div>
          <div class="text--error p_2 mb_3" v-if="isShowAlert">
            <span>Bạn phải chọn thời gian gia hạn cho gói</span>
          </div>
          <div class="send">
            <button class="cur" @click="handleRedirect">
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      </div>
      <!-- END: PRICE ORDER -->
    </div>
    <!-- END: WHEN CART HAVE PRODUCT -->
  </div>
</template>
<script src="./index.script.js"></script>
<style lang="scss" scoped>
@import "./index.style";
</style>
