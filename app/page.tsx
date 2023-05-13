import Banner from "@/components/Banner/Banner";
import CoinsTable from "@/components/CoinsTable";

interface HomeProps {}

export default async function Home({}: HomeProps) {
  return (
    <>
      <Banner />
      <CoinsTable />
    </>
  );
}
