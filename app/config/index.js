/**
 * Created by rdantzer on 17/01/17.
 */

'use strict';

module.exports = {
     mandrill: {
        template_name: 'new-message',
        template_content: [
            {'name': 'new-message'},
            {'content': 'content'}
        ],
        /**
         * @param content
         * @returns JSON params for mandrill api
         */
        message: (content) => {
            return {
                'html': '<p>HTML content</p>',
                'subject': subj,
                'from_email': 'noreply@wittycircle.com',
                'from_name': 'Wittycircle',
                'to': [{
                    'email': mail[0].email,
                    'name': 'Recipient',
                    'type': 'to'
                }],
                'headers': {
                    'Reply-To': 'noreply@wittycircle.com'
                },
                'important': false,
                'inline_css': null,
                'preserve_recipients': null,
                'view_content_link': null,
                'tracking_domain': null,
                'signing_domain': null,
                'return_path_domain': null,
                'merge': true,
                'merge_language': 'mailchimp',
                'global_merge_vars': [{
                    'name': 'merge1',
                    'content': 'merge1 content'
                }],
                'merge_vars': [
                    {
                        'rcpt': content.email,
                        'vars': [
                            {
                                'name': 'fname',
                                'content': content.res_first_name
                            },
                            {
                                'name': 'ffname',
                                'content': content.first_name
                            },
                            {
                                'name': 'flname',
                                'content': content.last_name
                            },
                            {
                                'name': 'fimg',
                                'content': content.profile_picture_icon
                            },
                            {
                                'name': 'fdesc',
                                'content': content.newd
                            },
                            {
                                'name': 'floc',
                                'content': content.loc
                            }
                        ]
                    }
                ]
            };
        }
    }
};