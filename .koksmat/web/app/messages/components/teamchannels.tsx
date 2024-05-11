"use client";

import useOfficeGraph from "@/koksmat/useofficegraph";

import { useState } from "react";
import { TeamsChannels } from "../datasources/me_team_channels";
import ViewChannelConversations from "./channelsconversations";
export interface Root {
  "@odata.context": string;
  "@odata.count": number;
  value: Value[];
}

export interface Value {
  id: string;
  createdDateTime: string;
  displayName: string;
  description: string;
  isFavoriteByDefault: any;
  email: string;
  tenantId: string;
  webUrl: string;
  membershipType: string;
}

export default function ViewTeamsChannels(props: { teamsId: string }) {
  const { teamsId } = props;
  const [channelId, setchannelId] = useState("");
  const channels = useOfficeGraph(TeamsChannels(teamsId));
  return (
    // <div className="grid min-h-screen w-full ">
    <div className="flex">
      <div>
        {channels?.items.map((channel) => {
          return (
            <div
              key={channel.id}
              className="hover:underline cursor-pointer"
              onClick={() => {
                setchannelId(channel.id);
              }}
            >
              {channel.displayName}
            </div>
          );
        })}
      </div>
      <div>
        {channelId && (
          <ViewChannelConversations teamId={teamsId} channelId={channelId} />
        )}
      </div>
    </div>
  );
}
