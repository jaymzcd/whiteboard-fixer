$(document).ready(function () {
   console.log("Ready!"); 

$('#dropzone').filedrop({
    fallback_id: 'upload_button',   // an identifier of a standard file input element, becomes the target of "click" events on the dropzone
    url: '/',              // upload handler, handles each file separately, can also be a function taking the file and returning a url
    paramname: 'userfile',          // POST parameter name used on serverside to reference file, can also be a function taking the filename and returning the paramname
    withCredentials: true,          // make a cross-origin request with cookies
    error: function(err, file) {        
        switch(err) {
            case 'BrowserNotSupported':
                alert('browser does not support HTML5 drag and drop')
                break;
            case 'TooManyFiles':
                // user uploaded more than 'maxfiles'
                break;
            case 'FileTooLarge':
                // program encountered a file whose size is greater than 'maxfilesize'
                // FileTooLarge also has access to the file which was too large
                // use file.name to reference the filename of the culprit file
                break;
            case 'FileTypeNotAllowed':
                // The file type is not in the specified list 'allowedfiletypes'
                break;
            case 'FileExtensionNotAllowed':
                // The file extension is not in the specified list 'allowedfileextensions'
                break;
            default:
                break;
        }
    },
    allowedfiletypes: ['image/jpeg','image/png','image/gif'],   // filetypes allowed by Content-Type.  Empty array means no restrictions
    allowedfileextensions: ['.jpg','.jpeg','.png','.gif'], // file extensions allowed. Empty array means no restrictions
    maxfiles: 25,
    maxfilesize: 20,    // max file size in MBs
    dragOver: function() {
        // user dragging files over #dropzone
        $(this).css('border-color', '#f20');
    },
    dragLeave: function() {
        // user dragging files out of #dropzone
        $(this).css('border-color', '#999');
    },
    docOver: function() {
        // user dragging files anywhere inside the browser document window
    },
    docLeave: function() {
        // user dragging files out of the browser document window
    },
    drop: function() {
        // user drops file
        console.log("DROPED");
    },
    uploadStarted: function(i, file, len){
        // a file began uploading
        // i = index => 0, 1, 2, 3, 4 etc
        // file is the actual file of the index
        // len = total files user dropped
        console.log("Started", file);
    },
    uploadFinished: function(i, file, response, time) {
        // response is the data you got back from server in JSON format.
        console.log(response);
        $('#dropzone').attr('src', response);
    },
    progressUpdated: function(i, file, progress) {
        // this function is used for large files and updates intermittently
        // progress is the integer value of file being uploaded percentage to completion
    },
    globalProgressUpdated: function(progress) {
        // progress for all the files uploaded on the current instance (percentage)
        // ex: $('#progress div').width(progress+"%");
    },
    speedUpdated: function(i, file, speed) {
        // speed in kb/s
    },
    rename: function(name) {
        // name in string format
        // must return alternate name as string
    },
    beforeEach: function(file) {
        // file is a file object
        // return false to cancel upload
    },
    beforeSend: function(file, i, done) {
        // file is a file object
        // i is the file index
        // call done() to start the upload
        done();
    },
    afterAll: function() {
        // runs after all files have been uploaded or otherwise dealt with
    }
});

});
