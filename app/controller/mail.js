/* eslint-disable indent */
/* eslint-disable eol-last */
'use strict';

const Controller = require('egg').Controller;

class MailController extends Controller {

    async send() {
        const { ctx, app } = this;

        const query = ctx.query;
        const title = query.title || ctx.params.title;
        const description = query.description || ctx.params.description;
        const receiver = query.receiver || ctx.params.receiver;

        console.log(title + ':' + description + ':' + receiver);

        // sync
        const res = await app.mailer.send({
            to: receiver, // list of receivers
            subject: title, // Subject line
            text: description, // plain text body
            html: `<b>${description}</b>`, // html body
        });

        console.log(res.response);

        ctx.body = res;
    }
}


module.exports = MailController;