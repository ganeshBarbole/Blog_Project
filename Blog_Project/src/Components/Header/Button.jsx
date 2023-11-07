import React from "react"

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-white",
    textColor = "text-white",
    className = " ",
    ...props
}){
    return(
        <button className = {`py-4 px-2 rouded-lg ${className} ${bgColor} ${type}`}{...props}>
           {children}
        </button>
    )
}