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
            content: postInput.val()
        }

        addPost(post);
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

async function addPost(post) {
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
        createPost(data.post);
    }
    catch (error) {
        console.error('Error:', error.message);
    }
}

function createPost(post) {
    console.log('Post added successfully:', post);
}

/*function createPost() {
    // Create the outermost container div
    var activityDiv = $('<div>').addClass('activity');

    // Create the activity header div
    var activityHeaderDiv = $('<div>').addClass('activity-header');

    // Create the activity user div
    var activityUserDiv = $('<div>').addClass('activity-user');

    // Create the profile photo img element
    var profilePhotoImg = $('<img>').addClass('profile-photo')
        .attr('src', '../public/images/home_icons/profile-photo-2.png')
        .attr('alt', 'profile-photo');

    // Create the username span element
    var usernameSpan = $('<span>').addClass('username').text('perky');

    // Append the profile photo and username to the activity user div
    activityUserDiv.append(profilePhotoImg, usernameSpan);

    // Create the time span element
    var timeSpan = $('<span>').addClass('time').text('1hr ago');

    // Append the activity user div and time span to the activity header div
    activityHeaderDiv.append(activityUserDiv, timeSpan);

    // Create the activity content div
    var activityContentDiv = $('<div>').addClass('activity-content');

    // Create the text paragraph element
    var textParagraph = $('<p>').addClass('text').text('Completed - Galaxy Quiz');

    // Append the text paragraph to the activity content div
    activityContentDiv.append(textParagraph);

    // Create the stats div
    var statsDiv = $('<div>').addClass('stats');

    // Create the like stat div
    var likeStatDiv = $('<div>').addClass('like stat');

    // Create the like button img element
    var likeButtonImg = $('<img>').addClass('home-icon')
        .attr('src', '../public/images/home_icons/like-icon.png')
        .attr('alt', 'like button');

    // Create the number of likes span element
    var numLikesSpan = $('<span>').addClass('num-likes').text('1K');

    // Append the like button and number of likes to the like stat div
    likeStatDiv.append(likeButtonImg, numLikesSpan);

    // Create the comment stat div
    var commentStatDiv = $('<div>').addClass('comment stat');

    // Create the comment button img element
    var commentButtonImg = $('<img>').addClass('home-icon')
        .attr('src', '../public/images/home_icons/comment-icon.png')
        .attr('alt', 'comment button');

    // Create the number of comments span element
    var numCommentsSpan = $('<span>').addClass('num-comments').text('500');

    // Append the comment button and number of comments to the comment stat div
    commentStatDiv.append(commentButtonImg, numCommentsSpan);

    // Append the like stat div and comment stat div to the stats div
    statsDiv.append(likeStatDiv, commentStatDiv);

    // Create the hr element
    var hrElement = $('<hr>');

    // Create the post div
    var postDiv = $('<div>').addClass('post');

    // Create the profile photo img element for the post
    var postProfilePhotoImg = $('<img>').addClass('profile-photo')
        .attr('src', '../public/images/home_icons/profile-photo-1.png')
        .attr('alt', 'profile-photo');

    // Create the post input box div
    var postInputBoxDiv = $('<div>').addClass('post-input-box');

    // Create the input text element
    var inputTextElement = $('<input>').attr('type', 'text')
        .attr('name', 'post')
        .attr('id', 'post')
        .attr('placeholder', 'Write your comment here...');

    // Create the attach icon img element
    var attachIconImg = $('<img>').addClass('input-icon')
        .attr('src', '../public/images/input_icons/attach-icon.png')
        .attr('alt', 'attach icon');

    // Create the send icon img element
    var sendIconImg = $('<img>').addClass('input-icon')
        .attr('src', '../public/images/input_icons/send-icon.png')
        .attr('alt', 'send icon');

    // Append the input text element, attach icon, and send icon to the post input box div
    postInputBoxDiv.append(inputTextElement, attachIconImg, sendIconImg);

    // Append the profile photo and post input box to the post div
    postDiv.append(postProfilePhotoImg, postInputBoxDiv);

    // Append all the elements to the activity div in the correct order
    activityDiv.append(activityHeaderDiv, activityContentDiv, statsDiv, hrElement, postDiv);

    // Return the created HTML structure
    return activityDiv;
}*/