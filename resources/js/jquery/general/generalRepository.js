
function getList(url){
    $.loader({
        className:"blue-with-image-2",
        content:''
    });
    return $.get(
        url,
        {
            apiKey:'77fa53ff60e8f41e40260b0dad826d76',
            "_": $.now()
        },
        null,
        'json'
    );
};
