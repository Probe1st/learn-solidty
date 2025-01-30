

export interface MopedShopContract {
    getBuyer: (address: string) => Promise<bool>;
    addBuyer: (string) => Promise<string>;
}