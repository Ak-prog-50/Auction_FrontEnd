import Header from "./components/Header";
import AuctionOpen from "./containers/AuctionOpen";

function App() {
  return (
    <>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <Header />
        <AuctionOpen />
      </div>
    </>
  );
}

export default App;
