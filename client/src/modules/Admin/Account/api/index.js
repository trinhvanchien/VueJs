/* eslint-disable new-cap */
import Api from "@/core/apis";
import request from "axios";
import CookieFunction from "@/core/utils/cookie";

export default {
  signInAdmin(user) {
    return Api().post("/signin/bz", user);
  },
  signUpAdmin(user) {
    return Api().post("/signup/bz", user, {
      headers: {
        token: user.code
      }
    });
  },
  signInByUser(user) {
    return Api().post("/signin", user);
  },
  signUpByUser(user) {
    return Api().post("/signup", user);
  },
  signUpUserAgency(user) {
    return request({
      method: "post",
      url: `${process.env.VUE_APP_API_URL}/signup`,
      data: user,
      headers: {
        Authorization: `sid=${CookieFunction.getCookie(
          "sid"
        )}; uid=${CookieFunction.getCookie(
          "uid"
        )}; cfr=${CookieFunction.getCookie(
          "cfr"
        )}; aid=${CookieFunction.getCookie("aid")};`
      }
    });
  },
  getAllUser() {
    return Api().get("users");
  },
  getUserById(id) {
    return Api().get(`users?_id=${id}`);
  },
  getUserMember(id) {
    return Api().get(`users/info?_id=${id}`);
  },
  getRole() {
    return Api().get("roles");
  },
  renewById(data) {
    return Api().post("users/renew/id", data);
  },
  renewByCode(data) {
    return Api().post("users/renew/code", data);
  },
  changeStatus(id) {
    return Api().post("users/status", id);
  },
  upload(file) {
    return Api().post("users", file);
  },
  updateUserByAdmin(data) {
    const uid = data._id,
      dataSender = {
        expireDate: data.expireDate,
        maxAccountFb: parseInt(data.maxAccountFb),
        _role: data._role,
        status: data.status
      };

    return Api().patch(`users/admin?_userId=${uid}`, dataSender);
  },
  getInfoByEmail(email) {
    return Api().get(`users/info/reset-password?email=${email}`);
  },
  checkCode(code) {
    return Api().post("users/info/code", code);
  },
  resetPassword(email) {
    return Api().post("users/reset-password", email);
  },
  createNewPassword(user) {
    return Api().post(`users/create-password`, user);
  },
  searchUser(keyword) {
    return Api().post(`users/search?_keyword=${keyword}`);
  }
};
