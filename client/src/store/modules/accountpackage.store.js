import AccountPackageServices from "@/services/modules/accountpackage.services";

const state = {
  membershipPackage: {},
  membershipPackages: [],
  membersPackage: [],
  statusMembership: ""
};
const getters = {
  membershipPackage: state => state.membershipPackage,
  membershipPackages: state => state.membershipPackages,
  statusMembership: state => state.statusMembership,
  membersPackage: state => state.membersPackage
};
const mutations = {
  membership_request: state => {
    state.statusMembership = "loading";
  },
  membership_success: state => {
    state.statusMembership = "success";
  },
  setMemberShip: (state, payload) => {
    state.membershipPackage = payload;
  },
  setMemberShipPackages: (state, payload) => {
    state.membershipPackages = payload;
  },
  setDeleteMemberShipPackages: (state, payload) => {
    state.membershipPackages = payload;
  },
  setUpdateMemberShipPackage: (state, payload) => {
    const position = state.membershipPackages
      .map((item, index) => {
        if (item._id === payload._id) return index;
      })
      .filter(item => item !== undefined);

    state.membershipPackages[position] = payload;
  },
  setListMembers: (state, payload) => {
    state.membersPackage = payload;
  },
  setRemoveMemberFromPackage: (state, payload) => {
    state.membersPackage = payload;
  }
};
const actions = {
  addMemberToMemberShip: async ({ commit }, payload) => {
    let result, dataSender;
    commit("membership_request");
    dataSender = {
      member: payload.idMember
    };
    await AccountPackageServices.addMember(payload.idPackage, dataSender);
    result = await AccountPackageServices.show(payload.idPackage);
    commit("setMemberShip", result.data.data);
    commit("setListMembers", result.data.data.members);

    commit("membership_success");
  },
  getMemberShipPackage: async ({ commit }) => {
    let result;
    commit("membership_request");
    result = await AccountPackageServices.index();
    commit("setMemberShipPackages", result.data.data);
    commit("membership_success");
  },
  getInfoMemberShipPackage: async ({ commit }, payload) => {
    let result;
    commit("membership_request");

    result = await AccountPackageServices.show(payload);
    commit("setMemberShip", result.data.data);
    commit("setListMembers", result.data.data.members);

    commit("membership_success");
  },
  createMemberShipPackage: async ({ commit }, payload) => {
    let result;
    commit("membership_request");
    await AccountPackageServices.create(payload);
    result = await AccountPackageServices.index();
    commit("setMemberShipPackages", result.data.data);
    commit("membership_success");
  },
  deleteMemberShipPackage: async ({ commit, state }, payload) => {
    let packages;
    commit("membership_request");

    packages = state.membershipPackages.filter(item => {
      if (item._id !== payload) return item;
    });

    commit("setDeleteMemberShipPackages", packages);

    await AccountPackageServices.delete(payload);

    commit("membership_success");
  },
  removeMemberFromPackage: async ({ commit, state }, payload) => {
    let dataSender;
    let members;
    commit("membership_request");

    members = state.membersPackage.filter(item => {
      if (item._id !== payload.id) return item;
    });

    commit("setRemoveMemberFromPackage", members);

    dataSender = {
      members: members.map(item => item._id)
    };

    await AccountPackageServices.update(payload.packageId, dataSender);

    commit("membership_success");
  },
  updateMemberShipPackage: async ({ commit }, payload) => {
    let result;
    commit("membership_request");

    commit("setUpdateMemberShipPackage", payload);
    await AccountPackageServices.update(payload._id, payload);

    result = await AccountPackageServices.show(payload._id);
    commit("setListMembers", result.data.data.members);

    commit("membership_success");
  },
  setMemberShipPackage: async ({ commit }) => {
    commit("setMemberShip", {
      name: "",
      limit: {
        post: 1,
        campaign: 1,
        slot: 1
      }
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
