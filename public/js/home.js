const homeTab = $('.home-tab');

const localActivitiesTab = $('.local');
const globalActivitiesTab = $('.global');
const localActivities = $('.local-activities');
const globalActivities = $('.global-activities');

const profilePhoto = $('.profile-photo');

$(document).ready(() => {
    getUserData();
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
});

function getUserData() {
    fetch('/userData')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const { username, profilePhoto: profilePhotoURL } = data;

        profilePhoto.attr('src', profilePhotoURL);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}