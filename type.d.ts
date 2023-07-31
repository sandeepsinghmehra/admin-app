type StoreType = {
    _id?: string,
    name: string,
    userId: string,
    createdAt?: Date,
    updatedAt?: Date
}

type BillboardType = {
    _id?: String,
    storeId: string,
    label: string,
    imageUrl: string,
    createdAt?: Date
    updatedAt?: Date
}

