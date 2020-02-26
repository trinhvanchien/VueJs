<template>
  <div class="ct wrap--footer">
    <div class="m_0 text_center content">
      <div class="d_inline_flex">
        <div class="copyright d_flex align_items_start mr_3">
          <icon-base width="40" height="20" viewBox="0 0 664 301">
            <hoot-logo-black />
          </icon-base>
          <div class="ml_1">© Copyright 2019</div>
        </div>
        <div class="language d_flex align_items_center">
          <div class="text">Tiếng Việt</div>
          <div class="icon--edit ml_1">
            <icon-base
              icon-name="edit"
              width="14"
              height="14"
              viewBox="0 0 24 24"
            >
              <icon-edit />
            </icon-base>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap--footer {
  color: #666666;
  font-size: 0.875rem;
  padding: 1.75rem 0 1rem 0;
  .language {
    color: #666;
    cursor: pointer;
    .icon--edit {
      margin: 0;
      color: #999999;
    }
    .text {
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
