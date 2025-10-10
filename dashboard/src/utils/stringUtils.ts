export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

type UrlParam = {
    key: string;
    value: string | number;
};

export function setUrlParams(params: UrlParam[]): string {
    if (params.length === 0) return "";

    return (
        "?" +
        params
            .map((param) => `${encodeURIComponent(param.key)}=${encodeURIComponent(String(param.value))}`)
            .join("&")
    );
}