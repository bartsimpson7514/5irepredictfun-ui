export const timeFormater = (time, needSeparator = true) => {
    if (time) {
        if (time.toString().length === 1) {
            return `0${time}${needSeparator ? ":" : ""}`;
        }
        return `${time}${needSeparator ? ":" : ""}`;
    }
    return "";
};

export const getDateFromUnixTimestamp = t => {
    const date = new Date(t * 1000);
    return `${date.getDate()}/${date.getMonth() +
        1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export function formatTime(days, hours, minutes, seconds) {
    let result = "";
    if (days > 0) {
        result += `${days}day `;
    }
    if (hours > 0) {
        result += `${hours}h `;
    }
    if (minutes > 0 && days === 0) {
        result += `${minutes}m `;
    }
    // result += `${minutes}m `;
    if (seconds > 0 && hours === 0) {
        result += `${seconds}s`;
    }

    return result.trim();
}
