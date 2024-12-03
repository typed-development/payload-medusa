import { getPayload, Payload } from "payload"
import configPromise from "@payload-config"

export let payloadClient: Payload | null = null
export const initPayload = async () => {
  payloadClient = await getPayload({
    config: configPromise,
  })
}
