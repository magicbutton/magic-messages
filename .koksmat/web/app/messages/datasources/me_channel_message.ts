import { UseOfficeGraphProps } from "@/koksmat/useofficegraph";

export interface Root {
  "@odata.context": string;
  "@odata.count": number;
  value: Value[];
}

export interface Value {}

export const ChannelMessage = (
  teamid: string,
  channelid: string,
  messageid: string
): UseOfficeGraphProps<Value> => {
  return {
    url: `https://graph.microsoft.com/beta/teams/${teamid}/channels/${channelid}/messages/${messageid}`,
    scopes: ["ChannelMessage.Read.All"],
    title: "Read Channel Message",
    tag: "channels/messages",
    mapper: (data: Value) => {
      return { ...data };
    },
  };
};
