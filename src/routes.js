import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import CreateAccountController from './app/controllers/CreateAccountController';

import LoginController from './app/controllers/LoginController';

import UpdateAccontController from './app/controllers/UpdateAccountController';

import LocationController from './app/controllers/LocationController';

import FileController from './app/controllers/FileController';

import GetUsersController from './app/controllers/GetUsersController';

import DislikeController from './app/controllers/DislikeController';

import LikeController from './app/controllers/LikeController';

import DeleteAccountController from './app/controllers/DeleteAccountController';

import GetInfosController from './app/controllers/GetInfosController';

import GetMatchesController from './app/controllers/GetMatchesController';

import PostController from './app/controllers/PostController';

import GetPostController from './app/controllers/GetPostsController';

import DeletePostController from './app/controllers/DeletePostController';

import BlockMatchesController from './app/controllers/BlockMatchesController';

import GetSessionsController from './app/controllers/GetSessionsController';

import LogoutController from './app/controllers/LogoutController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/create/account', CreateAccountController.store);

routes.post('/login', LoginController.store);

routes.use(authMiddleware);

routes.post('/location/send', LocationController.store);

routes.put('/account/updates', UpdateAccontController.update);

routes.post('/posts/publish', upload.any('files'), PostController.store);

routes.get('/posts/:id', GetPostController.index);

routes.delete('/delete/post', DeletePostController.delete);

routes.get('/cards', GetUsersController.index);

routes.post('/dislike', DislikeController.store);

routes.post('/like', LikeController.store);

routes.get('/matches', GetMatchesController.index);

routes.post('/upload/file', upload.single('file'), FileController.store);

routes.get('/user/getinfos', GetInfosController.store);

routes.post('/block/matches', BlockMatchesController.store);

routes.get('/sessions/list', GetSessionsController.index);

routes.post('/logout', LogoutController.store);

routes.delete('/delete/account', DeleteAccountController.delete);

module.exports = routes;
