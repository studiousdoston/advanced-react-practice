import { unstable_noStore as noStore } from "next/cache";
import { Cabin, T } from "@/app/_lib/types/common";
import CabinCard from "./CabinCard";
import cabinService from "@/app/_services/Cabin.service";

export default async function CabinList({ filter }: T) {
  //noStore();
  const cabins: Cabin[] = await cabinService.getCabins();

  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity < 8,
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  if (!cabins.length) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
