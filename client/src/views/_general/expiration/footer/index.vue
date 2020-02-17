<template>
  <div class="copy">
    <div class="ct m_auto d_flex align_items_center">
      <div class="copyright">Copyright © 2019 hoot.vn</div>
      <div class="ml_auto d_flex contact">
        <div class="icon">
          <a href="https://www.facebook.com/hootvietnam" target="_blank">
            <icon-base
              class="facebook"
              icon-name="hoot.vn"
              width="30"
              height="30"
              viewBox="0 0 105 105"
            >
              <icon-facebook />
            </icon-base>
            <span class="items">Liên hệ hỗ trợ</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
a {
  color: inherit;
}
.copy {
  background: linear-gradient(to right, #000 0%, #0e1f2c 100%);
  padding: 36px 0px;
  color: #fff;
  .contact {
    .items {
      padding: 0 1rem;
      font: 700 16px/28px "Open Sans", sans-serif;
    }
  }
}

// RESPONSIVE
@media screen and (max-width: 414px) {
  .copy {
    font-size: 0.82rem;
    .copyright {
      width: 40%;
    }
    .contact {
      .items {
        padding: 0;
        font: 700 14px/20px "Open Sans", sans-serif;
      }
    }
  }
}
</style>
