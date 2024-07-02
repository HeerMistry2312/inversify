import { Container } from "inversify";
import { DatabaseService } from "../db/databaseConnection";
import { TYPES } from "../types/types";
import "../controller/user.controller";
import "../controller/article.controller";
import '../controller/media.controller'
import { UserService } from "../services/user.service";
import AuthMiddleware from "../middleware/auth.middleware";
import RoleMiddleware from "../middleware/role.middleware";
import { ArticleService } from "../services/article.service";
import MediaService from "../services/media.service";
const container = new Container();
container.bind<DatabaseService>(TYPES.DataBaseService).to(DatabaseService);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
container.bind<RoleMiddleware>(TYPES.RoleMiddleware).to(RoleMiddleware);
container.bind<ArticleService>(TYPES.ArticleService).to(ArticleService);
container.bind<MediaService>(TYPES.MediaService).to(MediaService);
export default container;
