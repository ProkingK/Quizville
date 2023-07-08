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

        //addPost(post);
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
        fetch('/posts/add', {
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
        createPost(data);
    }
    catch (error) {
        console.error('Error:', error.message);
    }
}

function createPost(post) {
    console.log('Post added successfully:', data.post);
}