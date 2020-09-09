export default {
    isEmial(email) {
        sReg = /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
        if (!sReg.test(email)) {
            return false;
        }
        return true;
    },
    isMobile(phone) {
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            return false;
        } else {
            return true;
        }
    }
}