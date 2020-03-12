const request = require('request');

const getMedia = (url, cb) => {
    let safeUrl = url.replace(/\/$/i, '');
    let splitUrl = safeUrl.split('/');
    var mediaCode = splitUrl[4];

    request.get(`https://www.instagram.com/p/${mediaCode}/?__a=1`, (error, response, body)=>{
        try {
            let data = JSON.parse(response.body);
            let mediaData = data.graphql.shortcode_media;
            let mediaComment = mediaData.edge_media_to_parent_comment;
            console.log(mediaComment)
            let commentsData = []
            mediaComment.edges.forEach(element => {
                commentsData.push({
                    username:element.node.owner.username,
                    user_img:element.node.owner.profile_pic_url,
                    text:element.node.text
                })
            });
            var mediaResult = {
                'media': {
                    url: `https://www.instagram.com/p/${mediaData.shortcode}`,
                    owner:mediaData.owner.username,
                    owner_name: mediaData.owner.full_name,
                    owner_img: mediaData.owner.profile_pic_url,
                    thumbnail: mediaData.thumbnail_src
                },
                'count': commentsData.length,
                commentsData
            };
            return cb(mediaResult);
        } catch (error) {
            return cb(null);
        }
    })
}

module.exports = {
    getMedia
}