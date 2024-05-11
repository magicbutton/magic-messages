import { UseOfficeGraphProps } from "@/koksmat/useofficegraph";
import { Message } from "../components/messages";
export interface Root {
  "@odata.context": string;
  "@odata.count": number;
  value: Value[];
}

export interface Value {
  id: string;
  createdDateTime: any;
  displayName: string;
  description?: string;
  internalId: any;
  classification: any;
  specialization: any;
  visibility: any;
  webUrl: any;
  isArchived: boolean;
  tenantId: string;
  isMembershipLimitedToOwners: any;
  memberSettings: any;
  guestSettings: any;
  messagingSettings: any;
  funSettings: any;
  discoverySettings: any;
  summary: any;
}

export const MeJoinedTeams: UseOfficeGraphProps<Value> = {
  url: "https://graph.microsoft.com/v1.0/me/joinedTeams",
  scopes: ["Team.ReadBasic.All"],
  title: "Read Teams",
  tag: "me/joinedTeams",
};
