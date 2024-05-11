"use client";

import useOfficeGraph from "@/koksmat/useofficegraph";
import { MeJoinedTeams, Value } from "../datasources/me_teams";
import { useState } from "react";
import ViewTeamsChannels from "./teamchannels";
import { MeChats } from "../datasources/me_chats";

export default function Teams() {
  const teams = useOfficeGraph(MeJoinedTeams);
  const chats = useOfficeGraph(MeChats);
  const [selectedTeam, setselectedTeam] = useState<Value>();
  return (
    // <div className="grid min-h-screen w-full ">
    <div className="flex">
      <div>
        {teams?.items
          ?.sort((a, b) => a.displayName.localeCompare(b.displayName))
          .map((team) => {
            return (
              <div
                key={team.id}
                className="hover:underline cursor-pointer"
                onClick={() => setselectedTeam(team)}
              >
                {team.displayName}
              </div>
            );
          })}
      </div>
      <div>
        {selectedTeam && <ViewTeamsChannels teamsId={selectedTeam.id} />}
      </div>
    </div>
  );
}
