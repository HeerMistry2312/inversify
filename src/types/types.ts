const TYPES = {
  Mongoose: Symbol.for("Mongoose"),
  DataBaseService: Symbol.for("DatabaseService"),
  User: Symbol.for("User"),
  UserService: Symbol.for("UserService"),
  AuthMiddleware: Symbol.for("AuthMiddleware"),
  RoleMiddleware: Symbol.for("RoleMiddleware"),
  ArticleService: Symbol.for("ArticleService"),
  MediaService: Symbol.for("MediaService")
};

export { TYPES };
