module.exports = {
  "writeForgotPassword": code => {
    return `<!DOCTYPE html><html lang="en"><head> <style>.container{width: 100%; margin-right: auto; margin-left: auto; font-family: sans-serif; font-size: 14px; line-height: 150%;}table{border-spacing: 0 !important;}table tbody tr td{padding: 0;}@media (min-width: 576px){.container{max-width: 540px;}}@media (min-width: 768px){.container{max-width: 720px;}}.header-mail{background-color: rgba(255, 248, 230, 0.7); padding: 8px 15px 0 15px; border-bottom: 1px solid #f7f7f7;}.body-mail{background-color: #fff; padding: 15px;}.footer-mail{padding-left: 15px; padding-right: 15px; padding-top: 5px; padding-bottom: 10px; font-size: 11px; color: #888; background-color: #f7f7f7;}.text-center{text-align: center;}p{margin-bottom: .5rem;}.boder-space-solid{display: block !important; width: 100% !important; height: 5px !important; background-color: #eee !important; margin-top: 20px !important;}.cl-red{color: red;}.font-15{font-size: 15px;}.btn-orange{font-size: 16px; font-weight: 600; color: #fff !important; padding: 0.75rem 1.5rem; border-radius: .5rem; background-color: #ed1c24; text-decoration: none; transition: all 0.4s ease;}.btn-orange:hover, .btn-orange:active, .btn-orange:focus{color: #fff !important; background-color: #c31920;}</style></head><body> <div class="container"> <table> <tr> <td colspan="2" style="height: 1px"></td><td colspan="3" style="background-color: #F8F8F8; height: 1px !important;"></td><td colspan="2" style="height:1px"></td></tr><tr> <td colspan="2" style="height: 1px"></td><td colspan="3" style="background-color: #E8E8E8; height: 1px !important;"></td><td colspan="2" style="height:1px"></td></tr><tr> <td colspan="2" style="height: 1px"></td><td colspan="3" style="background-color: #D1D1D1; height: 1px !important;"></td><td colspan="2" style="height:1px"></td></tr><tr> <td style="background-color: #F8F8F8; width: 1px !important;"></td><td style="background-color: #E8E8E8; width: 1px !important;"></td><td style="background-color: #D1D1D1; width: 1px !important;"></td><td> <div class="header-mail"> <img src="https://server2.hoot.vn:8889/uploads/posts/person/5d249ec92f8e60400cebb3bc/1576838322027-xYT0zI28Oc6aOqpi.png" height="50px" alt=""> </div><div class="body-mail"> <p>Bạn vừa cho chúng tôi biết rằng bạn đã quên mật khẩu của mình. Nếu bạn thực sự làm điều đó, nhấn vào nút bên dưới để đặt lại mật khẩu mới:</p><div style="text-align: center; margin-top: 30px; margin-bottom: 30px;"> <a href="${code}" class="btn-orange">Tạo mới mật khẩu</a> </div><p>Nếu bạn không muốn đặt lại mật khẩu, hãy bỏ qua email này.</p><p>Đội ngũ kĩ thuật Hoot,</p><p style="font-style: italic;">Trân trọng!</p></div><div class="footer-mail"> <p style="margin-bottom: 0; line-height: 130%">Email này được gửi tự động và không nhận thư trả lời. Nếu bạn không cung cấp địa chỉ email này cho bất kì hoạt động nào của Hoot, hãy bỏ qua nó.</p><p style="margin-top: 5px ; line-height: 130%">© Masso JSC., Toà nhà Capital, 102 Trường Chinh, Hà Nội. Hotline: (+84) 856 449 666 - (+84) 799 449 666</p></div></td><td style="background-color: #D1D1D1; width: 1px !important;"></td><td style="background-color: #E8E8E8; width: 1px !important;"></td><td style="background-color: #F8F8F8; width: 1px !important;"></td></tr><tr> <td colspan="2" style="height: 1px"></td><td colspan="3" style="background-color: #D1D1D1; height: 1px !important;"></td><td colspan="2" style="height:1px"></td></tr><tr> <td colspan="2" style="height: 1px"></td><td colspan="3" style="background-color: #E8E8E8; height: 1px !important;"></td><td colspan="2" style="height:1px"></td></tr><tr> <td colspan="2" style="height: 1px"></td><td colspan="3" style="background-color: #F8F8F8; height: 1px !important;"></td><td colspan="2" style="height:1px"></td></tr></table> </div></body></html>`;
  },
  "signUpSuccess" : (url) => {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          .container {
            width: 100%;
            margin-right: auto;
            margin-left: auto;
            font-family: sans-serif;
            font-size: 14px;
            line-height: 150%;
          }
          table {
            border-spacing: 0 !important;
          }
          table tbody tr td {
            padding: 0;
          }
          @media (min-width: 576px) {
            .container {
              max-width: 540px;
            }
          }
          @media (min-width: 768px) {
            .container {
              max-width: 720px;
            }
          }
          .header-mail {
            background-color: rgba(255, 248, 230, 0.7);
            padding: 8px 15px 0 15px;
            border-bottom: 1px solid #f7f7f7;
          }
          .body-mail {
            background-color: #fff;
            padding: 15px;
          }
          .footer-mail {
            padding-left: 15px;
            padding-right: 15px;
            padding-top: 5px;
            padding-bottom: 10px;
            font-size: 11px;
            color: #888;
            background-color: #f7f7f7;
          }
          .text-center {
            text-align: center;
          }
          p {
            margin-bottom: 0.5rem;
          }
          .boder-space-solid {
            display: block !important;
            width: 100% !important;
            height: 5px !important;
            background-color: #eee !important;
            margin-top: 20px !important;
          }
          .cl-red {
            color: red;
          }
          .font-15 {
            font-size: 15px;
          }
          .btn-orange {
            font-size: 16px;
            font-weight: 600;
            color: #fff !important;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            background-color: #ed1c24;
            text-decoration: none;
            transition: all 0.4s ease;
          }
          .btn-orange:hover,
          .btn-orange:active,
          .btn-orange:focus {
            color: #fff !important;
            background-color: #c31920;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <table>
            <tr>
              <td colspan="2" style="height: 1px"></td>
              <td
                colspan="3"
                style="background-color: #F8F8F8; height: 1px !important;"
              ></td>
              <td colspan="2" style="height:1px"></td>
            </tr>
            <tr>
              <td colspan="2" style="height: 1px"></td>
              <td
                colspan="3"
                style="background-color: #E8E8E8; height: 1px !important;"
              ></td>
              <td colspan="2" style="height:1px"></td>
            </tr>
            <tr>
              <td colspan="2" style="height: 1px"></td>
              <td
                colspan="3"
                style="background-color: #D1D1D1; height: 1px !important;"
              ></td>
              <td colspan="2" style="height:1px"></td>
            </tr>
            <tr>
              <td style="background-color: #F8F8F8; width: 1px !important;"></td>
              <td style="background-color: #E8E8E8; width: 1px !important;"></td>
              <td style="background-color: #D1D1D1; width: 1px !important;"></td>
              <td>
                <div class="header-mail">
                  <img
                    src="https://server2.hoot.vn:8889/uploads/posts/person/5d249ec92f8e60400cebb3bc/1576838322027-xYT0zI28Oc6aOqpi.png"
                    height="50px"
                    alt=""
                  />
                </div>
                <div class="body-mail">
                  <p>
                    Bạn đã tạo tài khoản mới thành công!
                  </p>
                  <p>
                    Giờ bạn có thể đăng nhập vào hệ thống và trải nghiệm dịch vụ của chúng tôi:
                  </p>
                  <div
                    style="text-align: center; margin-top: 30px; margin-bottom: 30px;"
                  >
                    <a href="${url}" class="btn-orange">Đăng nhập vào Hoot</a>
                  </div>
                  <p>Đội ngũ kĩ thuật Hoot,</p>
                  <p style="font-style: italic;">Trân trọng!</p>
                </div>
                <div class="footer-mail">
                  <p style="margin-bottom: 0; line-height: 130%">
                    Email này được gửi tự động và không nhận thư trả lời. Nếu bạn
                    không cung cấp địa chỉ email này cho bất kì hoạt động nào của
                    Hoot, hãy bỏ qua nó.
                  </p>
                  <p style="margin-top: 5px ; line-height: 130%">
                    © Masso JSC., Toà nhà Capital, 102 Trường Chinh, Hà Nội.
                    Hotline: (+84) 856 449 666 - (+84) 799 449 666
                  </p>
                </div>
              </td>
              <td style="background-color: #D1D1D1; width: 1px !important;"></td>
              <td style="background-color: #E8E8E8; width: 1px !important;"></td>
              <td style="background-color: #F8F8F8; width: 1px !important;"></td>
            </tr>
            <tr>
              <td colspan="2" style="height: 1px"></td>
              <td
                colspan="3"
                style="background-color: #D1D1D1; height: 1px !important;"
              ></td>
              <td colspan="2" style="height:1px"></td>
            </tr>
            <tr>
              <td colspan="2" style="height: 1px"></td>
              <td
                colspan="3"
                style="background-color: #E8E8E8; height: 1px !important;"
              ></td>
              <td colspan="2" style="height:1px"></td>
            </tr>
            <tr>
              <td colspan="2" style="height: 1px"></td>
              <td
                colspan="3"
                style="background-color: #F8F8F8; height: 1px !important;"
              ></td>
              <td colspan="2" style="height:1px"></td>
            </tr>
          </table>
        </div>
      </body>
    </html>
    `;
  }
};
