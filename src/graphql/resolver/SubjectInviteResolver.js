'use strict';

const ses = require('../../aws/ses');

const SubjectInviteController = {
    invite: (args) => {
        return ses.sendAWSEmail(args.input.email, args.input.name, 'University of Waterloo', 'http://localhost:3000/accept-invite')
            .then(r => {
                console.log('Invite sent!');
                return r;
            });
    },
};

module.exports = SubjectInviteController;
