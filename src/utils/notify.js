import { Notify } from "@arco-design/mobile-react";

const notify = (func, options) => {
    if (!!window.NotifyInstance) {
        window.NotifyInstance.close();
    }
    window.NotifyInstance = Notify[func](options);
}

export default notify;