import { UseOfficeGraphProps } from "@/koksmat/useofficegraph";
import { Message } from "../components/messages";
export interface Root {
  "@odata.context": string;
  "@odata.count": number;
  value: Value[];
}

export interface Value {
  id: string;
  createdDateTime: string;
  displayName: string;
  description?: string;
  isFavoriteByDefault: any;
  email?: string;
  tenantId: string;
  webUrl: string;
  membershipType: string;
}

export const TeamsChannels = (teamid: string): UseOfficeGraphProps<Value> => {
  return {
    url: `https://graph.microsoft.com/v1.0/teams/${teamid}/channels`,
    scopes: ["Channel.ReadBasic.All"],
    title: "Read Channels",
    tag: "teams/channels",
  };
};
