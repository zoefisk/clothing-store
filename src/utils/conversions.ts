export const convertSizesToLongForm = (sizes: string[]): string[] => {
    const sizeMap: { [key: string]: string } = {
        S: "Small",
        M: "Medium",
        L: "Large",
        XL: "Extra Large",
        XXL: "Double Extra Large",
    };

    return sizes.map((size) => sizeMap[size] || size);
}

export const convertURLSize = (size: string | null): string => {
    switch (size) {
        case "extra-small":
            size = "XS";
            break;
        case "small":
            size = "S";
            break;
        case "medium":
            size = "M";
            break;
        case "large":
            size = "L";
            break;
        case "extra-large":
            size = "XL";
            break;
        case "double-extra-large":
            size = "XXL";
            break;
    }

    return <string>size;
}

export const convertSizesToShortForm = (sizes: string[]): string[] => {
    const sizeMap: { [key: string]: string } = {
        Small: "S",
        Medium: "M",
        Large: "L",
        "Extra Large": "XL",
        "Double Extra Large": "XXL",
    };

    return sizes.map((size) => sizeMap[size] || size);
}

export const convertLowerCaseToFirstUpperCase = (strArray: string[]): string[] => {
    return strArray.map((str) => str.charAt(0).toUpperCase() + str.slice(1));
}