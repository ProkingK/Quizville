const homeTab = $('.home-tab');

const localActivitiesTab = $('.local');
const globalActivitiesTab = $('.global');
const localActivities = $('.local-activities');
const globalActivities = $('.global-activities');

const profilePhoto = $('.profile-photo');

const postInput = $('#post-input');
const postForm = $('.post-input-box');

$(document).ready(async () => {
    const user = await getUserData();
    displayPosts(user);
    //profilePhoto.attr('src', user.profilePhoto);

    homeTab.addClass('selected-tab');

    localActivitiesTab.click(() => {
        localActivities.show();
        globalActivities.hide();
        localActivitiesTab.addClass('selected');
        globalActivitiesTab.removeClass('selected');
    });

    globalActivitiesTab.click(() => {
        globalActivities.show();
        localActivities.hide();
        globalActivitiesTab.addClass('selected');
        localActivitiesTab.removeClass('selected');
    });

    postForm.submit((e) => {
        e.preventDefault();
        const post = {
            username: user.username,
            profilePhoto: user.profilePhoto,
            content: postInput.val()
        }

        addPost(post, user);
        console.log(post);
        postInput.val('');
    });
});

async function getUserData() {
    try {
        const response = await fetch('/userData');

        if (!response.ok) {
            throw new Error('Error fetching user data');
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function displayPosts(user) {
    const posts = await getPosts();

    console.log(posts);

    posts.forEach(post => {
        globalActivities.prepend(createPost(post, user));
        localActivities.prepend(createPost(post, user));
    });
}

async function getPosts() {
    try {
        const response = await fetch('post/get-all');

        console.log(response);

        if (!response.ok) {
            throw new Error('Error fetching posts');
        }

        const data = await response.json();
        return data.posts;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function addPost(post, user) {
    try {
        const response = await fetch('/post/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        if (!response.ok) {
            throw new Error('Error adding post');
        }

        const data = await response.json();

        globalActivities.prepend(createPost(data.post, user));
        localActivities.prepend(createPost(data.post, user));
    }
    catch (error) {
        console.error('Error:', error.message);
    }
}

function createPost(post, user) {
    const activity = $('<div>').addClass('activity').attr('id', post._id);

    const activityHeader = $('<div>').addClass('activity-header');
    const activityUser = $('<div>').addClass('activity-user');
    const profilePhoto = $('<img>').addClass('profile-photo')
        .attr('src', post.profilePhoto)
        .attr('alt', 'profile-photo');
    const username = $('<span>').addClass('username').text('  ' + post.username);
    activityUser.append(profilePhoto, username);
    const time = $('<span>').addClass('time').text(getTimeDifference(post.timePosted, new Date()));
    activityHeader.append(activityUser, time);

    const activityContent = $('<div>').addClass('activity-content');
    const content = $('<p>').addClass('text').text(post.content);
    activityContent.append(content);

    const stats = $('<div>').addClass('stats');
    const likeStat = $('<div>').addClass('like stat');
    const likeButton = $('<img>').addClass('home-icon')
        .attr('src', '../public/images/home_icons/like-icon.png')
        .attr('alt', 'like button')
        .attr('like', false);
    if (post.likedUsers.includes(user.username)) {
        likeButton.attr('src', '../public/images/home_icons/liked-icon.png').attr('like', true);
    }
    const numLikes = $('<span>').addClass('num-likes').text(formatNumber(post.likes));
    likeStat.append(likeButton, numLikes);
    const commentStat = $('<div>').addClass('comment stat');
    const commentButton = $('<img>').addClass('home-icon')
        .attr('src', '../public/images/home_icons/comment-icon.png')
        .attr('alt', 'comment button');
    const numComments = $('<span>').addClass('num-comments').text(formatNumber(post.commentsCount));
    commentStat.append(commentButton, numComments);
    stats.append(likeStat, commentStat);

    const topLine = $('<hr>');
    
    const commentSection = $('<div>').addClass('comment-section').attr('showing', false).hide();
    post.comments.forEach(comment => {
        commentSection.append(createComment(comment));
    });
    
    const bottomLine = $('<hr>');

    const postDiv = $('<div>').addClass('post');
    const postProfilePhoto = $('<img>').addClass('profile-photo')
        .attr('src', user.profilePhoto)
        .attr('alt', 'profile-photo');
    const commentForm = $('<form>').addClass('post-input-box').addClass('comment-form');
    const commentInput = $('<input>').attr('type', 'text')
        .attr('name', 'post')
        .attr('required', 'required')
        .attr('id', 'comment-post')
        .attr('placeholder', 'Write your comment here...');
    const sendButton = $('<button>').attr('type', 'submit');
    const sendIcon = $('<img>').addClass('input-icon')
    .attr('src', '../public/images/input_icons/send-icon.png')
    .attr('alt', 'send icon');
    sendButton.append(sendIcon);
    commentForm.append(commentInput, sendButton);
    postDiv.append(postProfilePhoto, commentForm);

    activity.append(activityHeader, activityContent, stats, topLine, commentSection, bottomLine, postDiv);

    likeButton.click(() => {
        likePost(user.username, likeButton, activity);
    });

    commentButton.click(() => {
        if (commentSection.attr('showing') === 'false') {
            commentSection.show();
            commentSection.attr('showing', true);
        }
        else {
            commentSection.hide();
            commentSection.attr('showing', false);
        }
    });

    commentForm.submit(function (e) {
        e.preventDefault();
        console.log('submitted');
        const postID = activity.attr('id');
        const commentContent = commentInput.val();

        addComment(user, commentContent, postID);
        commentInput.val('');
    });

    return activity;
}

function likePost(username, likeButton, activity) {
    if (likeButton.attr('like') === 'false') {
        console.log('Liked' + activity.attr('id'));
        likeButton.attr('like', true);
        updateLike(username, 'like', activity.attr('id'));
        likeButton.attr('src', '../public/images/home_icons/liked-icon.png');
    }
    else {
        likeButton.attr('like', false);
        updateLike(username, 'unlike', activity.attr('id'));
        likeButton.attr('src', '../public/images/home_icons/like-icon.png');
    }
}

async function updateLike(username, type, postID) {
    try {
        const data = {
            type,
            postID,
            username
        }

        const response = await fetch('post/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error adding post');
        }
    }
    catch (error) {
        console.error('Error:', error.message);
    }
}

async function addComment(user, content, postID) {
    try {
        const params = {
            username: user.username,
            profilePhoto: user.profilePhoto,
            content,
            postID
        };

        const response = await fetch('/post/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            throw new Error('Error adding post');
        }

        const data = await response.json();
        const comment = createComment(data.comment);

        $('#' + postID).find('.comment-section').prepend(comment).show();
    }
    catch (error) {
        console.error('Error:', error.message);
    }
}

function createComment(commentData) {
    const comment = $('<div>').addClass('comment');

    const commentProfile = $('<div>').addClass('comment-profile');
    const profilePhoto = $('<img>').addClass('profile-photo');
    profilePhoto.attr('src', commentData.profilePhoto);
    profilePhoto.attr('alt', 'profile-photo');
    const username = $('<p>').addClass('username').text(commentData.username);
    commentProfile.append(profilePhoto, username);

    const commentContent = $('<p>').addClass('comment-content').text(commentData.content);
    const commentTime = $('<span>').addClass('comment-time').text(getTimeDifference(commentData.timePosted, new Date()));

    comment.append(commentProfile, commentContent, commentTime);

    return comment;
}

function getTimeDifference(startDate, endDate) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    const totalSeconds = Math.floor(Math.abs(end - start) / 1000);

    const years = Math.floor(totalSeconds / (365 * 24 * 60 * 60));
    const months = Math.floor(totalSeconds / (30 * 24 * 60 * 60));
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor(totalSeconds / (60 * 60));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds;

    if (years > 0) {
        return `${years}yr ago`;
    } else if (months > 0) {
        return `${months}mo ago`;
    } else if (days > 0) {
        return `${days}d ago`;
    } else if (hours > 0) {
        return `${hours}hr ago`;
    } else if (minutes > 0) {
        return `${minutes}min ago`;
    } else {
        return `${seconds}sec ago`;
    }
}

function formatNumber(number) {
    const formattedNumber = number.toLocaleString('en-US', {
        notation: 'compact',
        compactDisplay: 'short'
    });

    return formattedNumber;
}