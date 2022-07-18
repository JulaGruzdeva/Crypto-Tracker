import { makeAutoObservable } from "mobx"

export interface Coin {
    coin_id?: number,
    id: 'string',
    market_cap_rank: number,
    name: string,
    price_btc: number,
    image: string,
    symbol: string,
    price_change_percentage_24h: number,
    current_price: number,
    market_cap: number
}

class Coins {
    trending: Coin[] = []
    constructor() {
        makeAutoObservable(this)
    }

    saveData = (data: Coin[]) => {
        this.trending = data
    }


}
export default new Coins()
