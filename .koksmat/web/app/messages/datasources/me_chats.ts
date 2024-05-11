import { UseOfficeGraphProps } from "@/koksmat/useofficegraph";
export interface Root {
  "@odata.context": string;
  "@odata.count": number;
  "@odata.nextLink": string;
  value: Value[];
}

export interface Value {
  id: string;
  topic?: string;
  createdDateTime: string;
  lastUpdatedDateTime: string;
  chatType: string;
  webUrl: string;
  tenantId: string;
  onlineMeetingInfo?: OnlineMeetingInfo;
  viewpoint: Viewpoint;
}

export interface OnlineMeetingInfo {
  calendarEventId?: string;
  joinWebUrl: string;
  organizer: Organizer;
}

export interface Organizer {
  id: string;
  displayName: any;
  userIdentityType: string;
}

export interface Viewpoint {
  isHidden: boolean;
  lastMessageReadDateTime: string;
}

export const MeChats: UseOfficeGraphProps<Value> = {
  url: "https://graph.microsoft.com/v1.0/me/chats",
  scopes: ["Chat.ReadBasic"],
  title: "Read chats",
  tag: "me/chats",
};
