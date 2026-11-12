import HomePage from "../components/home-page";

// The live assistant section only renders when the server has a key for it,
// so the page never shows a demo that cannot answer.
export default function Page() {
  return <HomePage agentDemo={Boolean(process.env.ANTHROPIC_API_KEY)} />;
}
