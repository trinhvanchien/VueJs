<template>
  <div class="ct method">
    <div class="title mb_4">
      <span>Thanh toán</span>
    </div>
    <div class="main">
      <div class="title">
        <span>Chọn Phương thức thanh toán</span>
      </div>
      <div class="content">
        <div class="snap d_flex align_items_center justify_content_between">
          <div class="box">
            <div></div>
            <span>Chuyển khoản qua internet banking</span>
          </div>
          <div class="box">
            <div></div>
            <span>Thanh toán qua VN PAY</span>
          </div>
        </div>
        <div
          class="info d_flex flex_column align_items_center justify_content_center"
        >
          <!--START: DEFAULT  -->
          <div class="info--default">
            <ul class="info--transfer">
              <li><span class="pr_5 mr_5">STK:</span> 19033047647025</li>
              <li><span class="pr_5 mr_5">Tên:</span> Trần Quốc Toản</li>
              <li><span class="mr_5">Ngân hàng:</span> Techcombank</li>
              <li><span class="mr_5">Chi nhánh:</span> Hà Nội</li>
              <li>
                Thông tin chuyển khoản với nội dung: "Email đăng ký Hoot của
                bạn"
              </li>
              <li>Hoot sẽ nâng cấp cho bạn ngay lập tức</li>
            </ul>
          </div>
          <!--END: DEFAULT-->
          <!--START: INTERNET-->
          <div class="info--inter">
            <div class="form_group">
              <label>Tên</label>
              <input type="text" placeholder="Nhập tên" class="form_control" />
            </div>
            <div class="form_group">
              <label>Số điện thoại</label>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                class="form_control"
              />
            </div>
            <div class="form_group">
              <label>Email đăng ký</label>
              <input
                type="text"
                placeholder="Nhập email"
                class="form_control"
              />
            </div>
            <div class="d_flex align_items_center">
              <div class="form_group">
                <label>Hóa đơn</label>
                <input
                  type="text"
                  placeholder="Gia hạn tài khoản"
                  class="form_control"
                />
              </div>
              <div class="form_group">
                <label>Số tiền</label>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  class="form_control"
                />
              </div>
            </div>
            <div class="d_flex align_items_center">
              <div class="form_group">
                <label>Tên gói</label>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  class="form_control"
                />
              </div>
              <div class="form_group">
                <label>Thời hạn sử dụng</label>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  class="form_control"
                />
              </div>
            </div>
            <div class="form_group">
              <label>Nội dung thanh toán</label>
              <textarea class="form_control"></textarea>
            </div>
            <div>
              <button class="btn btn_info">Thanh toán</button>
            </div>
          </div>
          <!--END: INTERNET-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
