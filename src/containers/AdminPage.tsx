import InfoCards from "../components/InfoCards";
import AdminButtons from "../components/AdminButtons";
import { IAuctionProps } from "./AuctionOpen";

const AdminPage = ({addrs, chainId, auctionState} : IAuctionProps) => {
  return (
    <>
      <InfoCards />
      <AdminButtons addrs={addrs} chainId={chainId} auctionState={auctionState}/>
    </>
  );
};

export default AdminPage;
