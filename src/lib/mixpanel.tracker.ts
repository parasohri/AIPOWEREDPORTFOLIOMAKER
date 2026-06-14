import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID!, {
  api_host: "/api/mp",
  autocapture: true,
  record_sessions_percent: 100,
})

export default mixpanel;

export function trackGuestContinue(redirectTo: string) {
  mixpanel.track("Guest Continue Clicked", {
    redirect_to: redirectTo,
    source: "sign_in_page",
  });
}