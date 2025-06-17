import { Header } from "@/components/common/header";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Layout>
        <Header />
        <Button>テストです</Button>
        <h1 data-testid="title">Home</h1>
      </Layout>
    </>
  );
}
