let nickname = "john_doe"
let tag = '#' + 1234;
let newUserName = `${nickname + tag}`;


const usernameData = {
    username: nickname,
    legacyUserName: newUserName,
    legacyNickname: nickname,
    legacyTag: tag,

};

console.log (`"Username:${usernameData.username}, Previously known as ${usernameData.legacyNickname + usernameData.legacyTag}"`);