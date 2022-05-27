from instagramy import InstagramPost,InstagramUser,InstagramHashTag
from pprint import pprint
import json
import datetime
session_id = "38566737751%3Ah7JpgePGAoLxJe%334"
club_name='linuxcampusclub'
user = InstagramUser(club_name, sessionid=session_id)
print(user.is_verified)
print(user.biography)
lst_posts=user.posts
print(lst_posts)
print(type(lst_posts))
# for pos in lst_posts:
#     pprint(pos._asdict())
print(lst_posts[0])
pprint((lst_posts[0]._asdict()))
posts=[]
for post in lst_posts:
    post_det=post._asdict()
    posts.append(
        {
            "name": club_name,
            "short_code":post_det['shortcode'],
            "post_caption":post_det['caption'],
            "date_of_post":post_det['taken_at_timestamp'].strftime('%m/%d/%Y'),
            "post_url":post_det['post_url'],
            "media_url":post_det['post_source']
        }
    )
print(posts)
pprint(json.dumps(posts))