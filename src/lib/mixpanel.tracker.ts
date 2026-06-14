import mixpanel from "mixpanel-browser";

mixpanel.init('606c3e4ba62824543225eb00a2ebd3c7', {
  api_host: "/api/mp",
  autocapture: true,
  record_sessions_percent: 100,
})

export default mixpanel;

export function trackGuestContinue(redirectTo: string) {
  console.log("dsa");
  
  mixpanel.track("Guest Continue Clicked", {
    redirect_to: redirectTo,
    source: "sign_in_page",
  });
}