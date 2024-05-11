"use client";
import { aquireToken } from "@/koksmat/msal/auth";
import { useAccount, useMsal } from "@azure/msal-react";
import { useContext, useEffect, useState } from "react";
import { MagicboxContext } from "@/koksmat/magicbox-context";
import { Result } from "./httphelper";

export type UseOfficeGraphProps<T> = {
  url: string;
  scopes: string[];
  title: string;
  tag: string;
  mapper?: (data: any) => T;
};
export default function useOfficeGraph<T>(props: UseOfficeGraphProps<T>) {
  const { url, scopes, title, tag, mapper } = props;
  const { instance, accounts, inProgress } = useMsal();

  const account = useAccount(accounts[0] || {});
  const [error, seterror] = useState("");
  const [items, setitems] = useState<T[]>([]);
  const [isloading, setisloading] = useState(true);
  const magicbox = useContext(MagicboxContext);

  useEffect(() => {
    const load = async () => {
      //debugger;
      if (!account || !instance) return;
      //if (!isloading) return;

      seterror("");
      const calledTimestamp = new Date();
      // const url =
      //   "https://graph.microsoft.com/v1.0/me/messages?$top=30&$orderby=receivedDateTime+desc&select=from,importance,isRead,sentDateTime,toRecipients,webLink,receivedDateTime,subject,bodyPreview,body";

      const getItems = await aquireToken<any>(account!, instance, {
        scopes, //: ["Mail.Read"], // to include body preview use Mail.Read otherwise Mail.ReadBasic
        title, //: "Read mails",
        testurl: url,
      });

      magicbox.logServiceCall({
        calledTimestamp,
        responedTimestamp: new Date(),
        request: {
          args: [tag],
          url,
          body: "",
          channel: "graph",
          timeout: -1,
        },
        servicename: "graph",
        response: getItems,
      });
      seterror(getItems.errorMessage ?? "Unknown error");

      if (mapper) {
        const mappedItems = getItems.data?.value.map(mapper);

        setitems(mappedItems);
      } else {
        setitems(getItems.data?.value ?? []);
      }
      setisloading(false);
    };
    if (account && instance) {
      load();
    }
  }, [account, instance, url]);

  return { items, error, isloading, msalInprogress: inProgress };
}
