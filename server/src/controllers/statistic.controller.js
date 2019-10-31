const Account = require( "../models/Account.model" ),

  accountStatistics = async ( req, res ) => {
    // Handle number of active account
    const numberOfActiveAccount = await Account.countDocuments( { "expireDate": { "$gte": ( new Date() ).toISOString() } } );

    // Handle number of register account during a week
    let accountList = [];

    for ( let i = 0; i <= 6; i++ ) {
      const dateActive = new Date( ( new Date() ).setDate( ( new Date() ).getDate() - i ) ),
        dateActiveBehind = new Date( ( new Date() ).setDate( ( new Date() ).getDate() - i ) );

      dateActive.setHours( 0, 0, 0, 0 );
      dateActiveBehind.setHours( 23, 59, 59, 999 );

      // eslint-disable-next-line one-var
      const numberOfAccount = await Account.countDocuments( { "created_at": {
        "$gte": dateActive,
        "$lte": dateActiveBehind
      } } );

      accountList.push( {
        "date": dateActive,
        "amount": numberOfAccount
      } );
    }

    return res.status( 200 ).json( { "status": "success", "data": { "activeAccount": numberOfActiveAccount, "registerAccountStatistics": accountList } } );
  };

module.exports = {
  accountStatistics
};

