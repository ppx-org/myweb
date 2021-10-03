import qs from 'qs'

let utils = {
    stringify(obj) {
        let r = qs.stringify(obj, {filter:function(prefix, value) {
                if (value === null || value === undefined || value === '') {
                    return;
                }
                if (value instanceof Date) {
                    return;
                    // return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
                }
                return value;
            }, arrayFormat: 'repeat'});
        return r;
    }
}

export {utils};