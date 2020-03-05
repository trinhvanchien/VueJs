import EmptyComponent from "./empty";
import MembershipPackage from "./package";
import PurchasePost from "./purchasepost";

export default {
  components: {
    EmptyComponent,
    MembershipPackage,
    PurchasePost
  },
  data() {
    return {
      membershipPackage: [{}],
      value: 10,
      price: 0,
      number: 0,
      money: 0,
      monthsPurchase: null,
      descBill: null,
      imgCart: require("@/assets/images/add_to_cart.svg"),
      packageInfo: null,
      monthsSubscription: [
        {
          title: "one",
          value: 1
        },
        {
          title: "twelve",
          value: 12
        }
      ],
      selectedMonthSubscription: {
        title: "twelve",
        value: 12
      }
    };
  },
  computed: {
    packages() {
      return this.$store.getters.membershipPackages.filter(
        item => item.isOnlinePurchasable
      );
    },
    userMember() {
      return this.$store.getters.userInfoMember;
    }
  },
  async created() {
    this.$store.dispatch("getMemberShipPackage");
  },
  watch: {},
  methods: {
    chooseMonthSubscription(month) {
      this.selectedMonthSubscription = month;
    },
    async startFreeTrial() {
      await this.$store.dispatch("startFreeTrial");
      this.$router.push({ name: "homepage" });
    }
  }
};
