import { profile } from "@/lib/content";
import { HalftoneName } from "./HalftoneName";

export function Footer() {
  return (
    <footer className="pt-8 sm:pt-10 pb-8">
      <HalftoneName text={profile.name} />
    </footer>
  );
}
