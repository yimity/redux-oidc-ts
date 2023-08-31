import React, {useCallback, useEffect} from 'react';
import {SignoutCallbackComponentProps} from "./types.ts";
import {User} from "oidc-client-ts";

const SignoutCallbackComponent = ({ children, userManager, successCallback, errorCallback }: SignoutCallbackComponentProps) => {
	const onRedirectSuccess = useCallback((user: User) => successCallback(user), [successCallback]);

	const onRedirectError = useCallback((error: any) => {
		if (!errorCallback) {
      throw new Error(`Error handling redirect callback: ${error.message}`);
		}

		errorCallback(error);
  }, [errorCallback]);

	useEffect(() => {
		userManager.signinRedirectCallback()
      .then(onRedirectSuccess)
      .catch(onRedirectError);
	}, [onRedirectError, onRedirectSuccess, userManager]);

	return React.Children.only(children);
}

export default SignoutCallbackComponent;
