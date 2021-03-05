const shorthands = {
    w: "Western Oceanic",
    ce: "Central-Eastern Oceanic",
    a: "Admiralty",
    sm: "St. Matthias",
    y: "Yapese",
    t: "Temotu",
    si: "Solomon Islands",
    png: "Papua New Guinea",
    hw: "Hawaii",
    ei: "Easter Island",
};

function replaceShorthands(entry) {
    const trimmedEntry = entry.trim();
    const replacement = shorthands[trimmedEntry];
    return replacement === undefined ? trimmedEntry : replacement;
}

function familyFilter(familyArguments, reverse = false) {
    const targetFamilies = familyArguments.split(",").map(replaceShorthands);

    if (reverse) {
        return ({family}) => !targetFamilies.includes(family);
    } else {
        return ({family}) => targetFamilies.includes(family);
    }
}

function regionFilter(regionArguments, reverse = false) {
    const targetRegions = regionArguments.split(",").map(replaceShorthands);
    if (reverse) {
        return ({region}) => !targetRegions.includes(region);
    } else {
        return ({region}) => targetRegions.includes(region);
    }
}

function generateFilter(filterType, filterArguments) {
    switch(filterType.trim()) {
        case "f":
        case "family":
        case "fam":
            return familyFilter(filterArguments);
        case "!f":
        case "!family":
        case "!fam":
            return familyFilter(filterArguments, true);
        case "reg":
        case "region":
        case "r":
            return regionFilter(filterArguments);
        case "!reg":
        case "!region":
        case "!r":
            return regionFilter(filterArguments, true);
        default:
            return null;
    }
}

export function getFilters(filterQueries) {
    const filtersToReturn = [];

    filterQueries.split(";").forEach(function (filterQuery) {
        const [filterType, filterArguments] = filterQuery.split("=");
        const filterToAdd = generateFilter(filterType, filterArguments);
        if (filterToAdd !== null) filtersToReturn.push(filterToAdd);
    });

    return filtersToReturn;
}
