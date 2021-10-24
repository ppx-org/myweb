import qs from 'qs'

let utils = {
    stringify(obj) {
        return qs.stringify(obj, {filter:function(prefix, value) {
                if (value === null || value === undefined || value === '' || value instanceof PointerEvent) {
                    return;
                }
                return value;
            }, arrayFormat: 'repeat'});
    }
}

export {utils};