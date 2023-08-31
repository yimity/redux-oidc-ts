import { createUserManager } from '../index.ts';
import {WebStorageStateStore} from "oidc-client-ts";

const _SITE_HOST = 'http://localhost:4001';
const _AUTHORITY_ENDPOINT = 'http://localhost:5134';

export const userManagerConfig = {
  authority: _AUTHORITY_ENDPOINT,
  client_id: 'leyserfujiemployee',
  redirect_uri: _SITE_HOST + '/callback',
  response_type: 'code',
  scope: 'openid profile employeeapi',
  post_logout_redirect_uri: _SITE_HOST + '/signoutcallback',
  loadUserInfo: true,
  monitorSession: false,
  userStore: new WebStorageStateStore({
    store: window.localStorage,
  }),
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
