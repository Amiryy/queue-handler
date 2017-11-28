export default class QueueHandler {
// a utility component for any JS app, put your fetch requests on a queue and prevent excessive network calls.
    constructor () {
        this.requesting = false;
        this.stack = [];
    }

    add (api, token) {
        if (this.stack.length < 2) {
            return new Promise ((resolve, reject) => {
                this.stack.push({
                    api,
                    token,
                    resolve,
                    reject
                });
                this.makeQuery()
            })
        }
        return new Promise ((resolve, reject) => {
            this.stack[1] = {
                api,
                token,
                resolve,
                reject
            };
            this.makeQuery()
        })

    }

    makeQuery () {
        if (! this.stack.length || this.requesting) {
            return null
        }

        this.requesting = true;
        fetch(this.stack[0].api, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.stack[0].token
            }
        }).then(response => {
            this.stack[0].resolve(response);
            this.requesting = false;
            this.stack.splice(0, 1);
            this.makeQuery()
        }).catch(error => {
            this.stack[0].reject(error);
            this.requesting = false;
            this.stack.splice(0, 1);
            this.makeQuery()
        })
    }
}
