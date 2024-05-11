"use client";

import useOfficeGraph from "@/koksmat/useofficegraph";

import { useState } from "react";
import { ChannelMessages } from "../datasources/me_channel_messages";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistance } from "date-fns";

export default function ViewChannelConversations(props: {
  teamId: string;
  channelId: string;
}) {
  const { teamId, channelId } = props;
  const conversations = useOfficeGraph(ChannelMessages(teamId, channelId));
  const [selectedMessage, setselectedMessage] = useState();
  let content = <div></div>;

  return (
    // <div className="grid min-h-screen w-full ">
    <div>
      {conversations.items.map((conversation, key) => {
        let content = <div></div>;

        switch (conversation.body.contentType) {
          case "html":
            content = (
              <div
                dangerouslySetInnerHTML={{ __html: conversation.body.content }}
              ></div>
            );

            break;
          case "text":
            content = <div>{conversation.body.content}</div>;
            break;
          default:
            break;
        }
        return (
          <Card
            className="cursor-pointer m-3 hover:shadow-lg overflow-clip"
            key={key}
            onClick={() => {
              return;
              const w = window.innerWidth - 50;
              const h = window.innerHeight - 50;
              const windowFeatures =
                "left=25,top=25,width=" + w + ",height=" + h;
              const handle = window.open(
                conversation.webUrl,
                conversation.subject,
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
              <CardTitle>{conversation.subject}</CardTitle>
              <CardDescription>
                {/* <a href={conversation.webUrl} target="_blank" rel="noreferrer"> */}
                <div className="p-1 whitespace-nowrap overflow-ellipsis max-w-max">
                  {conversation?.from?.user?.displayName}
                </div>
                {/* </a> */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {content}
              {/* <pre>{JSON.stringify(conversation, null, 2)}</pre> */}
            </CardContent>
            <CardFooter>
              <p className="right-auto">
                {/* {mail.system} */}
                {formatDistance(
                  new Date(conversation.lastModifiedDateTime),
                  new Date(),
                  {
                    addSuffix: true,
                  }
                )}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

/**
 *
 * https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fmessage%2F19%3ALf0WrqeZ2Ro7neo9wi_vH-PEhgffAyHLFtyGmZT9qrQ1%40thread.tacv2%2F1713355859345%3FgroupId%3D015da75a-855b-45b5-a7cf-fb7ac80dfe1e%26tenantId%3D79dc228f-c8f2-4016-8bf0-b990b6c72e98%26createdTime%3D1713355859345%26parentMessageId%3D1713355859345&type=message&deeplinkId=99ffa79c-105f-4d9d-9459-c67543a50d9e&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true
 * https://teams.microsoft.com/v2/?tenantId=79dc228f-c8f2-4016-8bf0-b990b6c72e98#/l/message/19:Lf0WrqeZ2Ro7neo9wi_vH-PEhgffAyHLFtyGmZT9qrQ1@thread.tacv2/1713355859345?groupId=015da75a-855b-45b5-a7cf-fb7ac80dfe1e&tenantId=79dc228f-c8f2-4016-8bf0-b990b6c72e98&createdTime=1713355859345&parentMessageId=1713355859345&deeplinkId=8c3040ac-e99b-4652-9349-12139622b0ca
 */
