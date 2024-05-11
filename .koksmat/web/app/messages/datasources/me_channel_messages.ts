import { UseOfficeGraphProps } from "@/koksmat/useofficegraph";

export interface Root {
  "@odata.context": string;
  "@odata.count": number;
  value: Value[];
}

export interface Value {
  id: string;
  replyToId: any;
  etag: string;
  messageType: string;
  createdDateTime: string;
  lastModifiedDateTime: string;
  lastEditedDateTime: any;
  deletedDateTime: any;
  subject?: string;
  summary: any;
  chatId: any;
  importance: string;
  locale: string;
  webUrl: string;
  onBehalfOf: any;
  policyViolation: any;
  eventDetail: any;
  from: From;
  body: Body;
  channelIdentity: ChannelIdentity;
  attachments: any[];
  mentions: any[];
  reactions: Reaction[];
}

export interface From {
  application: any;
  device: any;
  user: User;
}

export interface User {
  "@odata.type": string;
  id: string;
  displayName: string;
  userIdentityType: string;
  tenantId: string;
}

export interface Body {
  contentType: string;
  content: string;
}

export interface ChannelIdentity {
  teamId: string;
  channelId: string;
}

export interface Reaction {
  reactionType: string;
  reactionContentUrl: any;
  createdDateTime: string;
  user: User2;
}

export interface User2 {
  application: any;
  device: any;
  user: User3;
}

export interface User3 {
  "@odata.type": string;
  id: string;
  displayName: any;
  userIdentityType: string;
}

/**
 *
 * https://teams.microsoft.com/l/message/19%3AmtnuA5uMLJcXeItZO7nvkOmuWBGJQZUYMotFctGa2To1%40thread.tacv2/1713429788122?groupId=82284267-79d3-4aee-84e8-16f3c0e830f4&tenantId=79dc228f-c8f2-4016-8bf0-b990b6c72e98&createdTime=1713429788122&parentMessageId=1713429788122
 * https://teams.microsoft.com/v2/?tenantId=79dc228f-c8f2-4016-8bf0-b990b6c72e98#/l/message/19:Lf0WrqeZ2Ro7neo9wi_vH-PEhgffAyHLFtyGmZT9qrQ1@thread.tacv2/1713355859345?groupId=015da75a-855b-45b5-a7cf-fb7ac80dfe1e&tenantId=79dc228f-c8f2-4016-8bf0-b990b6c72e98&createdTime=1713355859345&parentMessageId=1713355859345&deeplinkId=8c3040ac-e99b-4652-9349-12139622b0ca
 https://teams.microsoft.com/l/message/19:meeting_NWYwYTRkODctMzVjNy00NTgwLTk3NmMtZjVjYTViNTZkNzFm@thread.v2/1715168031344?context=%7B%22contextType%22%3A%22chat%22%7D

https://teams.microsoft.com/
_#
/l/message/19:meeting_NWYwYTRkODctMzVjNy00NTgwLTk3NmMtZjVjYTViNTZkNzFm@thread.v2/1715168031344
?
context=%7B%22contextType%22%3A%22chat%22%7D
&
deeplinkId=5f99fbc5-feb3-4660-82d8-51d633b56bc9

 * https://teams.microsoft.com/l/message/

19%3AmtnuA5uMLJcXeItZO7nvkOmuWBGJQZUYMotFctGa2To1%40thread.tacv2/1713429788122
?
groupId=82284267-79d3-4aee-84e8-16f3c0e830f4
&
tenantId=79dc228f-c8f2-4016-8bf0-b990b6c72e98
&
createdTime=1713429788122
&
parentMessageId=1713429788122
 
*/
function getSearchParam(url: string, key: string) {
  const s1 = url.split("?")[1];
  const s2 = s1.split(key + "=");
  if (s2.length < 2) return "";
  const s3 = s2[1].split("&")[0];

  return s3;
}
function fixUrl(url: string) {
  return url;
  const prefix = "https://teams.microsoft.com";
  if (!url.startsWith(prefix)) {
    return url;
  }

  const s1 = url.split(prefix)[1];
  const s2 = s1.split("?");
  const messageid = s2[0];

  const tenantId = getSearchParam(url, "tenantId");
  const groupId = getSearchParam(url, "groupId");
  const createdTime = getSearchParam(url, "createdTime");
  const parentMessageId = getSearchParam(url, "parentMessageId");

  //return "https://www.dr.dk";
  let newurl =
    `https://teams.microsoft.com/_#` +
    `#${messageid}` +
    `?context=%7B%22contextType%22%3A%22chat%22%7D` +
    `&deeplinkId=8c3040ac-e99b-4652-9349-12139622b0ca`;
  // newurl =
  //   "https://teams.microsoft.com/_#/l/message/19:meeting_NWYwYTRkODctMzVjNy00NTgwLTk3NmMtZjVjYTViNTZkNzFm@thread.v2/1715168031344?context=%7B%22contextType%22%3A%22chat%22%7D&deeplinkId=5f99fbc5-feb3-4660-82d8-51d633b56bc9";
  return newurl;
}
export const ChannelMessages = (
  teamid: string,
  channelid: string
): UseOfficeGraphProps<Value> => {
  return {
    url: `https://graph.microsoft.com/beta/teams/${teamid}/channels/${channelid}/messages`,
    scopes: ["ChannelMessage.Read.All"],
    title: "Read Channels Messages",
    tag: "channels/messages",
    mapper: (data: Value) => {
      return { ...data, webUrl: fixUrl(data.webUrl) };
    },
  };
};
