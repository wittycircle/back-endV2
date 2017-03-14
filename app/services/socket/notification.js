/**
 * Created by rdantzer on 06/03/17.
 */

'use strict';

const _ = require('lodash');

const notification_spec = {
    'follow': {
        from: "id of follower",
        follow_back: "boolean" //does the user followed you back ?
    },
    'message': {
        from: "id of sender",
        title: "message title if it has any",
        body: "message body",
        attached_data: "unused" //might be useful later, need to do some tests before
    },
    'project_follow': {
        from: "id of follower",
        to: "id of project" //the front end controller needs to check if the project is one of its own
    },
    'opening_application': {
        from: "id of applicant",
        to: "id of opening"
    },
    'opening_creation': {
        from: "id of opening" //this typeLookup could notify user about potential interesting openings
    },
    'rank': {
        position: "rank number"
    }
};

const _formatter = (type, message, data) => {
    if (typeof message === 'undefined') throw 'message can\'t be empty';
    return {
        h: {
            t: type,
            m: message,
            w: Date.now()
        },
        d: data || null
    };
};

exports.notify = socket => (type, message, data) => {
    socket.emit('server::notification', _formatter(type, message, data));
};