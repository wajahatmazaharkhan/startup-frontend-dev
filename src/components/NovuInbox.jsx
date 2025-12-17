import { Inbox } from "@novu/react";
import { useNavigate } from "react-router";

export function NovuInbox() {
  const navigate = useNavigate();

  return (
    <Inbox
      applicationIdentifier="1Pb1f4SpX4UB"
      subscriber="69428ad6f3f5192b658fd35a"
      routerPush={(path) => navigate(path)}
    />
  );
}
