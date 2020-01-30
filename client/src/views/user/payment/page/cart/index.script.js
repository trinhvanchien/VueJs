import EmptyComponent from "./empty";
export default {
  components: {
    EmptyComponent
  },
  data() {
    return {
      value: 10,
      price: 0,
      number: 0,
      money: 0,
      monthsPurchase: null,
      descBill: null,
      imgCart: require("@/assets/images/add_to_cart.svg"),
      packageSelected: [],
      packageInfo: null,
      isShowAlert: false,
      isShowUpgradePackage: false
    };
  },
  computed: {
    packages() {
      return this.$store.getters.membershipPackages;
    },
    userMember() {
      return this.$store.getters.userInfoMember;
    }
  },
  created() {
    this.$store.dispatch("getMemberShipPackage");
  },
  watch: {
    price(val) {
      if (val !== 0) {
        this.isShowAlert = false;
      }
    },
    money(val) {
      if (val !== 0) {
        this.isShowAlert = false;
      }
    }
  },
  methods: {
    choosePackage(val) {
      this.isShowUpgradePackage = false;
      this.packageInfo = val;
      this.handlePackagePrice(val.price);
    },
    handlePackagePrice(val) {
      const arr = Object.keys(val).map(i => val[i]);
      this.packageSelected = arr;
    },
    handleRedirect() {
      let dataSender;
      if (Number(this.price + this.money) === 0) {
        this.isShowAlert = true;
        return;
      } else {
        dataSender = {
          amount: Number(this.price + this.money),
          membershipPackage: this.packageInfo.name,
          monthsPurchase: this.monthsPurchase,
          orderDescription: this.descBill
        };
        this.$store.dispatch("setInfoPayment", dataSender);
        this.$router.push({ name: "payment_method" });
      }
    },
    showPricePackage(val) {
      let a, b, date;
      this.price = val.original;
      this.monthsPurchase = val.title;
      a = this.userMember.expireDate;
      date = Number(this.monthsPurchase * 30);
      b = this.calculateTime(new Date(a), date);
      this.descBill = `Thanh toan don hang thoi gian: ${b}`;
    },
    reductionPost() {
      if (this.number === 0) {
        return;
      } else {
        this.number = this.number - 10;
        this.money = this.number * 30000;
      }
    },
    increasePost() {
      this.number = this.number + 10;
      this.money = this.number * 30000;
    },
    calculateTime(a, b) {
      a.setDate(a.getDate() + b);
      return this.formatDate(a);
    },
    formatDate(d) {
      const dateTime = new Date(d),
        date = String(dateTime.getDate()).padStart(2, "0"),
        month = String(dateTime.getMonth() + 1).padStart(2, "0"),
        year = dateTime.getFullYear(),
        hours = String(dateTime.getHours()).padStart(2, "0"),
        mins = String(dateTime.getMinutes()).padStart(2, "0"),
        seconds = String(dateTime.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${date} ${hours}:${mins}:${seconds}`;
    },
    upgradePackage() {
      this.isShowUpgradePackage = true;
      this.packageSelected = [];
    }
  }
};
