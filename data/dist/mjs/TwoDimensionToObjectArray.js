function twoDimensionToObjectArray(arrays) {
    const [keys, ...values] = arrays;
    return values.map((array) => array.reduce((acc, value, index) => {
        let res = value;
        if (value === null) {
            res = "";
        }
        else if (value === true || value === "true") {
            res = true;
        }
        else if (value === false || value === "false") {
            res = false;
        }
        else if (!isNaN(+value)) {
            res = +value;
        }
        let key = keys[index];
        return Object.assign(Object.assign({}, acc), { [key.toString()]: res });
    }, {}));
}
export { twoDimensionToObjectArray };
