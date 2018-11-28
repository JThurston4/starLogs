import AuthController from "./components/auth/auth-controller";
import AuthService from "./components/auth/auth-service";
import CommentController from "./components/comments/comment-controller";
import LogController from "./components/logs/log-controller";


let auth = new AuthService

class App {
  constructor() {
    this.controllers = {
      authCtrl: new AuthController(auth),
      commentCtrl: new CommentController(auth),
      logsCtrl: new LogController(auth)
    }
  }
}

// @ts-ignore
window.app = new App