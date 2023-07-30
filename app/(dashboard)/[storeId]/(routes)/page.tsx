import Store from "@/models/Store"

interface DashboardProps {
    params: { storeId: string }
}

const DashboardPage: React.FC<DashboardProps> = async ({params}) => {
    const store = await Store.findOne({
        _id: params.storeId
    })
    return (
        <div>
            Active Store: {store?.name}
        </div>
    )
}

export default DashboardPage