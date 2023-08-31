import createUserManager from './create-user-manager';

export default function processSilentRenew() {
  const mgr = createUserManager();
  mgr.signinSilentCallback();
}
