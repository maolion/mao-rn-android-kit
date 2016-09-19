export function foramt(template, data) {
    if (!data) {
        return template;
    }
    return template.replace(/\{([^\}]+)\}/g, function (mStr, cStr1) {
        return data.hasOwnProperty(cStr1) ? data[cStr1] : cStr1;
    });
}
