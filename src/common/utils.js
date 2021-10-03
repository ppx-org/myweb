import qs from 'qs'

let utils = {
    stringify(obj) {
        return qs.stringify(obj, {filter:function(prefix, value) {
                if (value === null || value === undefined || value === '') {
                    return;
                }
                return value;
            }, arrayFormat: 'repeat'});
    }
}

export {utils};