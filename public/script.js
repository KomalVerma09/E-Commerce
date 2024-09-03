$(document).ready(function() {
    // Select the container element and set up hover event
    $('.card').hover(
        function() {
            // On mouse enter: hide truncated and show description
            $(this).find('.truncated').hide();
            $(this).find('.description').show();
        },
        function() {
            // On mouse leave: show truncated and hide description
            $(this).find('.truncated').show();
            $(this).find('.description').hide();
        }
    );

    // After Click: dropdown selected list show and previos list will be hide
    $('.uniqueCategory').on('click',(e)=>{
        e.preventDefault();
        $('.selected-list').removeClass('hidden');
        $('.product-list').addClass('hidden')
        let selectedCategory = $(e.target).text().trim();
    
    
    
        $('.selected-list .cards .card').each(function () {
            let productCategory = $(this).find('.categoryText').text().trim();
            
            if (productCategory === selectedCategory) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    
        $('.selected-list .cards').removeClass('py-5');
        $('.selected-list').addClass('py-5');
    
    });

    // after scroll the screen top nav will be stick
    $(window).on('scroll', function() {
        let filterNav = $('.filterNav');
        let filterContainer = $('.filterContainer');
        let multiLevelDropdownButton = $('.multiLevelDropdownButton');
        let btn = $('.btn');
    
        if ($(window).scrollTop() > 0) {
            filterNav.css({
                'background-color': '#1F2937',
                'border-top': '1px solid gray',
                'padding-top': '10px'
            });
            filterContainer.css('padding-bottom', '5px');
            multiLevelDropdownButton.css('background-color', '#04537D');
            btn.css({
                'background-color': '#04537D',
                'color': 'white'
            });
        } else {
            filterNav.css({
                'background-color': 'transparent',
                'border-top': 'none',
                'padding-top': ''
            });
            filterContainer.css('padding-bottom', '');
            multiLevelDropdownButton.css('background-color', 'rgb(17 24 39)');
            btn.css({
                'background-color': '',
                'color': ''
            });
        }
    });
    


    
});




