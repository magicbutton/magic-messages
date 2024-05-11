"use client";

import { AccountIdentifiers, MsalProvider, useMsal } from "@azure/msal-react";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  AccountInfo,
  AuthenticationResult,
  EventMessage,
  EventType,
  IPublicClientApplication,
  PublicClientApplication,
} from "@azure/msal-browser";
import { msalConfig } from "@/koksmat/msal/config";
import { MagicboxContext } from "@/koksmat/magicbox-context";
import { Result, https } from "../httphelper";

export interface ScenarioProps {
  scopes: string[];
  title: string;
  testurl: string;
  token?: string;
}

export async function aquireToken<T>(
  account: AccountInfo,
  instance: IPublicClientApplication,
  scenario: ScenarioProps
) {
  let result: Result<T> = { hasError: false };
  if (account && scenario) {
    try {
      const response = await instance.acquireTokenSilent({
        scopes: scenario?.scopes ?? [],
        account: account,
      });
      scenario.token = response.accessToken;
      result = await https(response.accessToken, "GET", scenario.testurl)!;
    } catch (error) {
      try {
        const response = await instance.acquireTokenPopup({
          scopes: scenario?.scopes ?? [],
          account: account,
        });
        scenario.token = response.accessToken;
        result = await https<T>(response.accessToken, "GET", scenario.testurl);
      } catch (error) {
        result.hasError = true;
        result.errorMessage = (error as Error).message;
      }
    }
  }
  return result;
}
export function MSALWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [msalInstance, setmsalInstance] = useState<PublicClientApplication>();
  const [log, setlog] = useState<string[]>([]);
  const { accounts } = useMsal();
  const magicbox = useContext(MagicboxContext);

  useEffect(() => {
    const pca = new PublicClientApplication(msalConfig);
    setmsalInstance(pca);
  }, []);
  useEffect(() => {
    const load = async () => {
      if (!msalInstance) return;
      await msalInstance.initialize();
      magicbox.registerAuth(msalInstance);
      // Account selection logic is app dependent. Adjust as needed for different use cases.
      const accounts = msalInstance.getAllAccounts();

      if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
        magicbox.setAccount(
          accounts[0].name ?? "",
          accounts[0].username ?? "",
          "",
          accounts[0].localAccountId ?? "",
          accounts[0].idTokenClaims?.roles ?? []
        );
      }

      msalInstance.addEventCallback((event: EventMessage) => {
        console.log("MSAL", event.eventType);

        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
          const payload = event.payload as AuthenticationResult;
          const account = payload.account;
          msalInstance.setActiveAccount(account);
          magicbox.setAccount(
            account.name ?? "",
            account.username ?? "",
            "",
            account.localAccountId ?? "",
            account.idTokenClaims?.roles ?? []
          );
        }
      });
    };

    load();
  }, [msalInstance]);

  return (
    <div>
      {msalInstance && (
        <MsalProvider instance={msalInstance}>{children}</MsalProvider>
      )}
    </div>
  );
}
