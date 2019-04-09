;(function browser(){
    var browser = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    if (version.length >= 2) {
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (browser == "Microsoft Internet Explorer" && (trim_Version == "MSIE6.0" || trim_Version == "MSIE7.0"
                || trim_Version == "MSIE8.0")) {
            window.location.href = './ie.html';
        }
    }
})();

