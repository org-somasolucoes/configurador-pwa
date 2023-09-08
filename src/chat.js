const readline = require('readline');

class Chat {
    constructor() {
        this.rl = new readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async question(body) {
        let __body = String(body).trim();
        __body += ": ";

        return new Promise((resolve) => {
            this.rl.question(__body, (message) => {
                resolve(message); // Retorna a mensagem
            });

            // this.rl.on('close', () => {
            //     resolve(null); // Sinaliza a saída caso o usuário feche o terminal
            // });
        });
    }

    async say(message) {
        const __message = String(message).trim();
        return await new Promise((resolve, reject) => {
            this.rl.write(__message + '\n');
            resolve();
        })
    }
}

module.exports = Chat;
