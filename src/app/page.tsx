import { Button } from "@/components/ui/button";
import { signOut } from "./login/actions";

export default function Home() {
  return (
    <>
      <form>
        <button formAction={signOut}>Log out</button>
      </form>
      <Button>テストです</Button>
      <h1 data-testid="title">Home</h1>
    </>
  );
}
