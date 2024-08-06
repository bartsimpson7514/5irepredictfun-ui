import React from "react";

const Card = ({ children }) => {
    return (
        <div className="border-2 bg-vault-card hover:bg-vault-card-hover group cursor-pointer border-vault-card-border rounded-lg h-full">
            <div className="p-6 flex flex-col gap-8">{children}</div>
        </div>
    );
};

export default Card;
