

    export function makeRequest() {
        fetch("https://www.boredapi.com/api/activity", {
            method:"GET",
            headers: {
             "Content-Type": "application/json",
            },
                    })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(JSON.stringify(data));
                document.getElementById("h1id").innerText = data.activity;
            }
            )
            .catch(error => {
                alert('There was a problem with the request.');
            });
    
};