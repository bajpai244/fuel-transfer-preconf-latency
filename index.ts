import { Provider, Wallet } from "fuels"

const main = async () => {
    const FUEL_PROVIDER_URL = process.env.FUEL_PROVIDER_URL
    if (!FUEL_PROVIDER_URL) {
        throw new Error("FUEL_PROVIDER_URL is not set")
    }
    const PRIVATE_KEY = process.env.PRIVATE_KEY
    if (!PRIVATE_KEY) {
        throw new Error("PRIVATE_KEY is not set")
    }

    const provider = new Provider(FUEL_PROVIDER_URL);
    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider)

    const randomRecipient = Wallet.generate().address;

    const timerState = process.hrtime.bigint();
    const {id} = await (await wallet.transfer(randomRecipient, 10)).waitForPreConfirmation();
    const timerEnd = process.hrtime.bigint();

    console.log(`Time taken: ${Number(timerEnd - timerState) / 1000000} milliseconds`)

    console.log(`Transaction ID: ${id}`)
}

main()