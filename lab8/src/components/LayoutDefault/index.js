import React from "react";
import Header from "../Header";

export default function LayoutDefault({children}) {
    return(
        <>
            <Header/>
            {
                children
            }
        </>
    )
}