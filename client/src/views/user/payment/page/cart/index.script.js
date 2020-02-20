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
          title: "three",
          value: 3
        },
        {
          title: "six",
          value: 6
        },
        {
          title: "twelve",
          value: 12
        }
      ],
      selectedMonthSubscription: {
        title: "three",
        value: 3
      }
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
  async created() {
    this.$store.dispatch("getMemberShipPackage");
  },
  watch: {},
  methods: {
    chooseMonthSubscription(month) {
      this.selectedMonthSubscription = month;
    }
  }
};
