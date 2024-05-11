import { UseOfficeGraphProps } from "@/koksmat/useofficegraph";
import { Message } from "../components/messages";

export interface Mail {
  "@odata.etag": string;
  id: string;
  receivedDateTime: string;
  sentDateTime: string;
  importance: string;
  isRead: boolean;
  webLink: string;
  from?: From;
  bodyPreview: string;
  subject: string;
  toRecipients: ToRecipient[];
  "@odata.type"?: string;
}

export interface From {
  emailAddress: EmailAddress;
}

export interface EmailAddress {
  name: string;
  address: string;
}

export interface ToRecipient {
  emailAddress: EmailAddress2;
}

export interface EmailAddress2 {
  name: string;
  address: string;
}

export const MeMessages: UseOfficeGraphProps<Message> = {
  url: "https://graph.microsoft.com/v1.0/me/messages?$top=30&$orderby=receivedDateTime+desc&select=from,importance,isRead,sentDateTime,webLink,receivedDateTime,subject,bodyPreview",
  scopes: ["Mail.Read"],
  title: "Read mails",
  tag: "me/messages",
  mapper: (v: Mail): Message => {
    const message: Message = {
      ...v,
      from: v.from!,
      system: "graph",
    };
    return message;
  },
};
