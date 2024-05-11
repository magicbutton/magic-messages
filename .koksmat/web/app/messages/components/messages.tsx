"use client";
import { aquireToken } from "@/koksmat/msal/auth";
import { useAccount, useMsal } from "@azure/msal-react";
import { use, useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicboxContext } from "@/koksmat/magicbox-context";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import { get } from "http";
import useOfficeGraph from "@/koksmat/useofficegraph";
import { MeMessages } from "../datasources/me_messages";

export interface From {
  emailAddress: EmailAddress;
}

export interface EmailAddress {
  name: string;
  address: string;
}

export interface ToRecipient {
  emailAddress: EmailAddress;
}

export interface Message {
  id: string;
  receivedDateTime: string;
  sentDateTime: string;
  importance: string;
  isRead: boolean;
  webLink: string;
  from: From;
  bodyPreview: string;
  subject: string;
  toRecipients: ToRecipient[];
  system: string;
}

export default function Messages() {
  const { instance, accounts, inProgress } = useMsal();

  const account = useAccount(accounts[0] || {});
  const [messages, setmessages] = useState<Message[]>();
  const [error, seterror] = useState("");
  const magicbox = useContext(MagicboxContext);
  const mails = useOfficeGraph<Message>(MeMessages);

  useEffect(() => {
    if (mails === undefined) return;
    if (!mails.items) return;

    setmessages(mails.items);

    seterror(mails.error);
  }, [mails]);

  return (
    // <div className="grid min-h-screen w-full ">
    <div>
      {error && <div>Error: {error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {messages?.map((mail) => (
          <Card
            className="cursor-pointer m-3 hover:shadow-lg overflow-clip"
            key={mail.id}
            onClick={() => {
              const w = window.innerWidth - 50;
              const h = window.innerHeight - 50;
              const windowFeatures =
                "left=25,top=25,width=" + w + ",height=" + h;
              const handle = window.open(
                mail.webLink,
                mail.subject,
                windowFeatures
              );
              if (!handle) {
                // The window wasn't allowed to open
                // This is likely caused by built-in popup blockers.
                // …
              }
            }}
          >
            <CardHeader>
              <CardTitle>{mail.subject}</CardTitle>
              <CardDescription>
                <div className="p-1 whitespace-nowrap overflow-ellipsis max-w-max">
                  {mail?.from?.emailAddress.name} - (
                  {mail?.from?.emailAddress.address})
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-1">{mail.bodyPreview}</div>
            </CardContent>
            <CardFooter>
              <p className="right-auto">
                {/* {mail.system} */}
                {formatDistance(new Date(mail.receivedDateTime), new Date(), {
                  addSuffix: true,
                })}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
