import DarkModeToggle from "@/components/darkmodetoggle";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div>
      <a href="/messages/settings/teams">
        <Button>Select Teams</Button>
      </a>
      <a href="/messages/settings/chats">
        <Button>Select Chats</Button>
      </a>
    </div>
  );
}
