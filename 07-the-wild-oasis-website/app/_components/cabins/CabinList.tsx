import { Cabin } from "@/app/_lib/types/common";
import CabinCard from "./CabinCard";
import cabinService from "@/app/_services/Cabin.service";

export default async function CabinList() {
  const cabins: Cabin[] = await cabinService.getCabins();

  if (!cabins.length) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
