import { PREDICT_TOKENS } from "@Constants";

export const removeQuestMatic = ["241", "250", "426"];
export const removeQuestBGN = ["279", "229", "288"];
export const InprogressQuestMatic = [179];
export const InprogressQuestBGN = [219];

export const checkBlackListInprogressQuest = (predictableToken, id) => {
    return (
        (predictableToken === PREDICT_TOKENS.MATIC &&
            InprogressQuestMatic.includes(Number(id))) ||
        (predictableToken === PREDICT_TOKENS.BGN &&
            InprogressQuestBGN.includes(Number(id)))
    );
};
