exports.dateFormat = (date) => {
    const createdAt = new Date(date).toDateString().split(' ');
    return createdAt[1] + ' ' + createdAt[2] + ', ' + createdAt[3];
};
exports.jsonFormatUserName = (user) => JSON.parse(JSON.stringify(user[0])).name;