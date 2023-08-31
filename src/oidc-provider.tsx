import React, {useCallback, useEffect} from 'react';
import { userExpired, userFound, silentRenewError, sessionTerminated, userExpiring, userSignedOut } from './actions';
import {OidcProviderProps} from "./types.ts";
import {User} from "oidc-client-ts";

const OidcProvider = ({ children, userManager, store }: OidcProviderProps<any>) => {
	// event callback when the user has been loaded (on silent renew or redirect)
	const onUserLoaded = useCallback((user: User) =>{ store.dispatch(userFound(user))}, [store]);

	// event callback when silent renew errored
  const onSilentRenewError = useCallback((error: any) => {
		store.dispatch(silentRenewError(error))
	}, [store]);

  // event callback when the access token expired
  const onAccessTokenExpired = useCallback(() => {
		store.dispatch(userExpired())
	}, [store]);

  // event callback when the user is logged out
  const onUserUnloaded = useCallback(() => {
		store.dispatch(sessionTerminated())
	}, [store]);

  // event callback when the user is expiring
  const onAccessTokenExpiring = useCallback(() => {
		store.dispatch(userExpiring())
	}, [store]);

  // event callback when the user is signed out
  const onUserSignedOut = useCallback(() => {
		store.dispatch(userSignedOut())
	}, [store]);

	useEffect(() => {
		userManager.events.addUserLoaded(onUserLoaded);
    userManager.events.addSilentRenewError(onSilentRenewError);
    userManager.events.addAccessTokenExpired(onAccessTokenExpired);
    userManager.events.addAccessTokenExpiring(onAccessTokenExpiring);
    userManager.events.addUserUnloaded(onUserUnloaded);
    userManager.events.addUserSignedOut(onUserSignedOut);

		return () => {
			userManager.events.removeUserLoaded(onUserLoaded);
			userManager.events.removeSilentRenewError(onSilentRenewError);
			userManager.events.removeAccessTokenExpired(onAccessTokenExpired);
			userManager.events.removeAccessTokenExpiring(onAccessTokenExpiring);
			userManager.events.removeUserUnloaded(onUserUnloaded);
			userManager.events.removeUserSignedOut(onUserSignedOut);
		}
	}, [onAccessTokenExpired, onAccessTokenExpiring, onSilentRenewError, onUserLoaded, onUserSignedOut, onUserUnloaded, userManager.events])

	return React.Children.only(children);
}

export default OidcProvider;
