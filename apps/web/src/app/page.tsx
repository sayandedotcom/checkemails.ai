import { Button } from "@repo/ui";
import { InputForm } from "../components";

export default function Page(): JSX.Element {
  return (
    <main className="bg-background flex flex-col items-center justify-center min-h-screen gap-10">
      <Button variant="secondary">Log In with Google</Button>
      <InputForm />
    </main>
  );
}
