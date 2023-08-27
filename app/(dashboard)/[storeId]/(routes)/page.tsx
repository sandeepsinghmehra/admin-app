import dynamic from 'next/dynamic'
 
// Server Component:
const Map = dynamic(() => import('@/components/map'), {ssr: false});

import LineChart from "@/components/chart/line";
import Store from "@/models/Store"

interface DashboardProps {
    params: { storeId: string }
}

const DashboardPage: React.FC<DashboardProps> = async ({params}) => {
  const store = await Store.findOne({
    _id: params.storeId
  });
  const mapData = [
    {
      countryInfo: {
        _id: '123343234',
        lat: 29.555012,
        long: 79.340990
      },
      address: 'Betalghat, Haldwani, Uttarakhand'
    }
  ]
  
    return (
        <div>
            <div className="flex-1 bg-gray-100 p-4 pageHeight">
            <h1 className="text-muted-foreground text-3xl font-bold">Active Store: {store?.name}</h1>
            <div className="py-4">
              <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-3">
                <div className="bg-blue-300 py-10 px-5">
                  <p className="text-white font-semibold text-2xl">Total Orders: 234</p>
                </div>
                <div className="bg-green-300 py-10 px-5">
                  <p className="text-white font-semibold text-2xl">Total Product: 55</p>
                </div>
                <div className="bg-red-300 py-10 px-5">
                  <p className="text-white font-semibold text-2xl">Total Payments: ₹54,333.00</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              <div className="flex flex-col w-full lg:w-1/2 h-full">
                <h2 className="text-gray-600 text-2xl font-semibold mb-2">Map</h2>
                <div className="w-full h-[400px]">
                  <Map mapData={mapData} />
                </div>              
              </div>
              <div className="flex flex-col w-full lg:w-1/2 h-full">
                <h2 className="text-gray-600 text-2xl font-semibold mb-2">Line Graph</h2>
                <div className="w-full h-[400px]">
                  <LineChart />
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default DashboardPage