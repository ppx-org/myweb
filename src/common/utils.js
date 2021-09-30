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
    },
    cleanEmpty(getParams) {
        let returnObj = {}
        for (let key in getParams) {
            if (getParams[key] != null && getParams[key] != '') {
                returnObj[key] = getParams[key];
            }
        }
        return returnObj;
    }
}

export {utils};