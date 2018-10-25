var authSession = (function() {
  var username = "yolo";
  var password = "yolo";

  var getUsername = function() {
    return username;
  };

  var setUsername = function(_username) {
    username = _username;
  };

  return {
    getUsername: getUsername,
    setUsername: setUsername
  }

})();

export default authSession;