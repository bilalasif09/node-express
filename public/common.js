function postFormData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: data, // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
};

function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-access-token": localStorage.getItem('x-access-token')
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
};

function putData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-access-token": localStorage.getItem('x-access-token')
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
};

function loginRegisterCallback(data, ref) {
    console.log("Login/Register", data);
    if (data.status == 200) { //success
        if (ref === 'reg') 
            window.location.href= '/login';
        else {
            localStorage.setItem('x-access-token', data.response);
            window.location.href = '/';
        };
    } else {
      $('.alert-danger').removeClass('d-none');
      if (data.status == 401) {
        $('.alert-danger').text('Password is incorrect');
      } else if (data.status == 404) {
        $('.alert-danger').text('Email is incorrect');
      } else {
        $('.alert-danger').text('Something went wrong. Try again');
      };
    };
};