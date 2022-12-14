import React, { createContext, useContext, useEffect, useState } from 'react'

const Crypto = createContext();

function CryptoContext(props) {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");

    useEffect(() => {
        setSymbol(currency === "INR" ? "₹" : "$");
    }, [currency])

    return (
        <Crypto.Provider value={{ currency, setCurrency, symbol, setSymbol }}>
            {props.children}
        </Crypto.Provider>
    )
}

export default CryptoContext;

export function CryptoState() {
    return useContext(Crypto);
};