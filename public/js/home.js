const homeTab = $('.home-tab');
const localActivitiesTab = $('.local');
const globalActivitiesTab = $('.global');
const localActivities = $('.local-activities');
const globalActivities = $('.global-activities');

$(document).ready(() => {
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