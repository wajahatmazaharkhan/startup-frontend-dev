import { Novu } from "@novu/api";

const novu = new Novu({
  secretKey: import.meta.env.VITE_NOVU_SECRET_KEY,
});

export const TriggerNotification = async () => {
  novu.trigger({
    workflowId: "account-created",
    to: {
      subscriberId: "69428ad6f3f5192b658fd35a",
      timezone: "Asia/Calcutta",
    },
    payload: {},
  });
};
