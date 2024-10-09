module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.collection('categories').updateMany({}, {$set: {isDeletedDefinitely: false}});
    await db.collection('inventories').updateMany({}, {$set: {isDeletedDefinitely: false}});
    await db.collection('products').updateMany({}, {$set: {isDeletedDefinitely: false}});
    await db.collection('users').updateMany({}, {$set: {isDeletedDefinitely: false}});
    await db.collection('warehouses').updateMany({}, {$set: {isDeletedDefinitely: false}});
    await db.collection('inventorymovements').updateMany({}, {$set: {isDeletedDefinitely: false}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
