import {
  CardComponent,
  SheetComponent,
  TopBannerComponent,
} from "@/src/components";

export default function Page(): JSX.Element {
  return (
    <section className="flex flex-col gap-10 bg-destructive max-w-6xl mx-auto p-5">
      <section>
        <TopBannerComponent />
      </section>
      <section> Buttons</section>
      <section>
        <SheetComponent>
          <CardComponent />
        </SheetComponent>
      </section>
    </section>
  );
}
