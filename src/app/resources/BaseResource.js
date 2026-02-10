class BaseResource {
    static collection(data, formatter) {
        if (!data) return { items: [], meta: {} };

        const items = Array.isArray(data) ? data : (data.items || []);
        const meta = data.meta || {};

        return {
            items: items.map(item => formatter(item)),
            meta
        };
    }
}

module.exports = BaseResource;