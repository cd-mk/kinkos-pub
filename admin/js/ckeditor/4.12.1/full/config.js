/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
    config.language = "ko";
    config.font_defaultLabel = "굴림";
    config.font_names = "굴림;돋움;바탕;궁서;굴림체;돋움체;바탕체;궁서체;나눔고딕;나눔명조;"+
        'Arial;Comic Sans MS;Courier New;Lucida Sans Unicode;monospace;sans-serif;serif;Tahoma;Times New Roman;Verdana';
    config.filebrowserUploadUrl ="/util/imageUpload";
    config.enterMode = CKEDITOR.ENTER_BR;
    config.extraPlugins = 'autogrow';
    config.allowedContent = true;	// 태그 속성 사라지지 않도록 설정
    config.forceSimpleAmpersand = true;
    config.removePlugins = 'elementspath'; //하단 html bar 제거
    config.toolbar = [
        ['Font', 'FontSize'],
        ['BGColor', 'TextColor' ],
        ['Bold', 'Italic', 'Strike', 'Underline', 'RemoveFormat'],
        '/',
        ['Image', 'SpecialChar', 'Smiley'],
        ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        ['Blockquote', 'NumberedList', 'BulletedList'],
        ['Link', 'Unlink'],
        ['Source'],
//        ['Undo', 'Redo']
    ];
    config.contentsCss = [
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'
    ];
};

CKEDITOR.on('dialogDefinition', function (ev) {
    var dialogName = ev.data.name;
    var dialog = ev.data.definition.dialog;
    var dialogDefinition = ev.data.definition;
    if (dialogName == 'image') {
        dialog.on('show', function (obj) {
            this.selectPage('Upload'); //업로드텝으로 시작
        });
    }
});