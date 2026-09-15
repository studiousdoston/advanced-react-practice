import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useGetCabins } from "./useGetCabins";
import Table from "../../ui/Table";

export type CabinData = {
  created_at?: string;
  description: string;
  discount: number;
  maxCapacity: number;
  id?: number;
  image: string;
  name: string;
  regularPrice: number;
};

//*--------------------------------------------------
//                   COMPONENT
//*--------------------------------------------------
export default function CabinTable() {
  const { isLoading, cabins } = useGetCabins();

  if (isLoading) return <Spinner />;

  //*--------------------------------------------------
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div>Image</div>
        <div>cabin</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div>edit</div>
      </Table.Header>

      <Table.Body
        data={cabins}
        render={(cabin: CabinData) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}
