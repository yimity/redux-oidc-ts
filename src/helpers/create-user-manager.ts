import { UserManager } from 'oidc-client-ts';

export default function createUserManager(config?: any) {
  return new UserManager(config);
}
