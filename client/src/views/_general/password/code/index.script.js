/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
import StringFunction from "@/utils/functions/string.js";

export default {
  props: [ "email" ],
  methods: {
    gotoEmail() {
      const emailType = StringFunction.findSubString( this.email, "@", "." );
      let routeData = "https://mail.google.com";

      if ( emailType === "yahoo" ) {
        routeData = "https://mail.yahoo.com";
      }

      window.open(routeData, '_blank');
    }
  }
};

