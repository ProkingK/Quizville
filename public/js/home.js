const homeTab = $('.home-tab');

const localActivitiesTab = $('.local');
const globalActivitiesTab = $('.global');
const localActivities = $('.local-activities');
const globalActivities = $('.global-activities');

const profilePhoto = $('.profile-photo');

const postButton = $('#post');
const attachButton = $('#attach');
const postInput = $('#post-input');

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

    postButton.click(() => {
        const post = {
            username: user.username,
            profilePhoto: user.profilePhoto,
            content: postInput.val()
        }

        addPost(post, user);
        console.log(post);
        postInput.val('');
    });

    attachButton.click(() => {
        alert('This feature is currently unavaliable');
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
    const activity = $('<div>').addClass('activity');

    const activityHeader = $('<div>').addClass('activity-header');
    const activityUser = $('<div>').addClass('activity-user');
    const profilePhoto = $('<img>').addClass('profile-photo')
        .attr('src', post.profilePhoto)
        .attr('alt', 'profile-photo');
    const username = $('<span>').addClass('username').text(post.username);
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
        .attr('alt', 'like button');
    const numLikes = $('<span>').addClass('num-likes').text('  ' + formatNumber(post.likes));
    likeStat.append(likeButton, numLikes);
    const commentStat = $('<div>').addClass('comment stat');
    const commentButton = $('<img>').addClass('home-icon')
        .attr('src', '../public/images/home_icons/comment-icon.png')
        .attr('alt', 'comment button');
    const numComments = $('<span>').addClass('num-comments').text('  ' + formatNumber(post.commentsCount));
    commentStat.append(commentButton, numComments);
    stats.append(likeStat, commentStat);

    const line = $('<hr>');

    const postDiv = $('<div>').addClass('post');
    const postProfilePhoto = $('<img>').addClass('profile-photo')
        .attr('src', user.profilePhoto)
        .attr('alt', 'profile-photo');
    const postInputBox = $('<div>').addClass('post-input-box');
    const inputTextElement = $('<input>').attr('type', 'text')
        .attr('name', 'post')
        .attr('id', 'post')
        .attr('placeholder', 'Write your comment here...');
    const attachIcon = $('<img>').addClass('input-icon')
        .attr('src', '../public/images/input_icons/attach-icon.png')
        .attr('alt', 'attach icon');
    const sendIcon = $('<img>').addClass('input-icon')
        .attr('src', '../public/images/input_icons/send-icon.png')
        .attr('alt', 'send icon');
    postInputBox.append(inputTextElement, attachIcon, sendIcon);
    postDiv.append(postProfilePhoto, postInputBox);

    activity.append(activityHeader, activityContent, stats, line, postDiv);

    return activity;
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