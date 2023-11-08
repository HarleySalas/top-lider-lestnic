const rootUser = process.env.MONGO_ROOT_USER;
const rootPwd = process.env.MONGO_ROOT_PWD;
const user = process.env.MONGO_USER;
const pwd = process.env.MONGO_PWD;
const database = process.env.MONGO_DATABASE;

db = db.getSiblingDB("admin");

db.createUser({
  user: rootUser,
  pwd: rootPwd,
  roles: [
    {
      role: "userAdminAnyDatabase",
      db: "admin",
    },
  ],
});

db = db.getSiblingDB(database);

db.createUser({
  user: user,
  pwd: pwd,
  roles: [
    {
      role: "readWrite",
      db: database,
    },
  ],
});
