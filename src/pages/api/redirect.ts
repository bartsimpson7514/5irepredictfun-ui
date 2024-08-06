import { NextApiRequest, NextApiResponse } from "next";
import { symbolToAssetMapping } from "@Constants";

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const widgetSymbol = String(req.query.tvwidgetsymbol);
    if (symbolToAssetMapping[widgetSymbol]) {
        res.redirect(
            `${symbolToAssetMapping[widgetSymbol].url}?asset=${widgetSymbol}`
        );
    } else {
        res.redirect("/");
    }
}
