import React, {useCallback, useEffect, useRef} from 'react';
import {SigninCallbackComponentProps} from "./types.ts";

const CallbackComponent = ({ children, userManager, successCallback, errorCallback }: SigninCallbackComponentProps) => {
	const shouldCancel = useRef(false);

	const onRedirectCallback = useCallback(async () => {
		try {
			const user = await userManager.signinRedirectCallback();
			if (user) {
				successCallback(user);
			} else {
				throw new Error('User is not authenticated');
			}
		} catch (error: any) {
			if (!errorCallback) {
				throw new Error(`Error handling redirect callback: ${error.message}`);
			}

			errorCallback(error);
		}
	}, [errorCallback, successCallback, userManager]);

	useEffect(() => {
		if (!shouldCancel.current) {
			onRedirectCallback();
		}

		return () => {
			shouldCancel.current = true;
		}
	}, [onRedirectCallback]);

	return React.Children.only(children);
}

export default CallbackComponent;
