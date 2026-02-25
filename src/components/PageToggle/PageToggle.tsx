import Link from "next/link";
// import { usePathname } from "next/navigation";

const PageToggle = () => {
  // const pathname = usePathname();

  return (
    <div>
      <Link href="/profile/saved">Saved</Link>

      <Link href="/profile/own">Own</Link>
    </div>
  );
};

export default PageToggle;
