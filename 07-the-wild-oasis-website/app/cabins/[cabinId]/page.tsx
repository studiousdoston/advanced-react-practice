import { Suspense } from "react";
import { Cabin as CabinData } from "@/app/_lib/types/common";
import cabinService from "@/app/_services/Cabin.service";
import Reservation from "@/app/_components/account/reservations/Reservation";
import Spinner from "@/app/_components/home/Spinner";
import Cabin from "@/app/_components/cabins/Cabin";

type Props = {
  params: Promise<{ cabinId: string }>;
};
//* GENERATING DYNAMIC METADATA
export async function generateMetadata({ params }: Props) {
  const { cabinId } = await params;
  const cabin = await cabinService.getCabin(cabinId);
  return { title: `Cabin ${cabin.name}` };
}
//* MAKE DYNAMIC PAGE STATIC USING generateStaticParams API
export async function generateStaticParams() {
  const cabins = await cabinService.getCabins();
  const ids = cabins.map((cabin: CabinData) => ({ cabinId: String(cabin.id) }));
  return ids;
}

type PageProps = {
  params: Promise<{ cabinId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { cabinId } = await params;
  const cabin: CabinData = await cabinService.getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
