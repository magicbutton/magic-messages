"use client";

import useOfficeGraph from "@/koksmat/useofficegraph";

import { useState } from "react";
import ViewTeamsChannels from "./teamchannels";
import { MeChats, Value } from "../datasources/me_chats";

export default function Teams() {
  const chats = useOfficeGraph(MeChats);
  const [selectedChat, setselectedChat] = useState<Value>();
  return (
    // <div className="grid min-h-screen w-full ">
    <div className="flex">
      <div>
        {chats?.items
          ?.sort((a, b) => b.createdDateTime.localeCompare(a.createdDateTime))
          .map((chat) => {
            return (
              <div
                key={chat.id}
                className="hover:underline cursor-pointer"
                onClick={() => setselectedChat(chat)}
              >
                {chat.topic}
              </div>
            );
          })}
      </div>
      <div>
        {selectedChat && <pre>{JSON.stringify(selectedChat, null, 2)}</pre>}
      </div>
    </div>
  );
}
