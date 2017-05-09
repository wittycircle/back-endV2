/*	**************************************************************

share_invite_link removed
invite_link column set directly in user
Will not import, will recreate better system
[like: `${username}_W${+id + 23}`  ]
--

removed n_read in project_users
--

openings: 
Redo of openings and opening_tags tables
--

	************************************************************** */

// ------------------ removed also ------------------
first_log
share_invite_link
project_discussion_likes
project_contributor
networks_group
project_network
profile_network
profile_network_2
project_history
notification_list
// ------------------ new one ------------------
location
// ------------------ prev one ------------------
users
profiles
categories
projects
account_validation
reset_passwords
skills
user_skills
user_experiences
user_followers
interests
user_interests
project_followers
project_discussion -> discussion
project_discussion_replies -> discussion_messages
project_reply_likes -> discussion_likes
project_users
project_invites
project_openings -> openings
openings_tags
networks
university_list
articles
tag_articles
article_tags
article_likes
article_message
invitation
notification_permission
invite_university
views

/*	**************************************************************



// ------------------ remaining ------------------
profile_ranking
rank_of_the_day
messages
old_messages