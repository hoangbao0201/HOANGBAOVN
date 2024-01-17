const formatNumberAbbreviation = (number: number | null) => {
    if(number === null) {
        return null;
    }
    let result: any = number;

    if (number > 1000000) {
        result = (Math.round((number / 1000000) * 10) / 10) + "M";
    } else if (number > 100000) {
        result = (Math.round((number / 1000) * 10) / 10) + "K";
    } else if (number > 10000) {
        result = (Math.round((number / 1000) * 10) / 10) + "K";
    } else if (number > 1000) {
        result = (Math.round((number / 1000) * 10) / 10) + "K";
    }

    return result;
}

export default formatNumberAbbreviation;
