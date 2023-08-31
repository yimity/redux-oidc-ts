import { SignoutResponse, UserManager, User } from "oidc-client-ts";
import { Store } from "redux";
import React from "react";

export interface SigninCallbackComponentProps {
  readonly userManager: UserManager;
  readonly successCallback: (user: User) => void;
  readonly errorCallback?: (error: Error) => void;
  readonly route?: string;
  readonly children?: any;
}

export class CallbackComponent extends React.Component<
  SigninCallbackComponentProps
> {}

export interface SignoutCallbackComponentProps {
  readonly userManager: UserManager;
  readonly successCallback: (user: User) => void;
  readonly errorCallback?: (error: Error) => void;
  readonly route?: string;
  readonly children?: any;
}

export class SignoutCallbackComponent extends React.Component<
  SignoutCallbackComponentProps
> {}

export interface OidcProviderProps<TSTate> {
  readonly userManager: UserManager;
  readonly store: Store<TSTate>;
  readonly children?: React.ReactNode;
}

export class OidcProvider<TState> extends React.Component<
  OidcProviderProps<TState>
> {}
