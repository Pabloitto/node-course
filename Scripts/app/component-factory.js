module.exports = {
    createComponent: function (obj) {
        if (!obj.imports) {
            obj.imports = [];
        }
        return obj.imports.concat([obj.body]);
    }
};