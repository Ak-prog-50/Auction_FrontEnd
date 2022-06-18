import React from "react"

export type TAuctionStateSetter = React.Dispatch<React.SetStateAction<number>>

export type TGetAuctionState = ({ throwOnError, onComplete, onError, onSuccess, params: fetchParams, } : any) => Promise<number>