import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Header />
      <Button>テストです</Button>
      <h1 data-testid="title">Home</h1>
    </>
  );
}
