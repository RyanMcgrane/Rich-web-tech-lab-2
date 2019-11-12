const inputValue = document.querySelector("#search");
const searchButton = document.querySelector(".searchButton");
const imgContainer = document.querySelector(".main__profile-img")
const nameContainer = document.querySelector(".main__profile-name");
const unContainer = document.querySelector(".main__profile-username");
const reposContainer = document.querySelector(".main__profile-repos");
const urlContainer = document.querySelector(".main__profile-url");
const locationContainer = document.querySelector(".main__profile-location");
const emailContainer = document.querySelector(".main__profile-email");
const numOfGistsContainer = document.querySelector(".main__profile-numOfGists");

const client_id ="Iv1.32af8cafcaa4b782";
const client_secret ="98042c34507380fed4e97b97ab8b0417d59fb2a5";


const fetchUsers = async (user) => 
{
    const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);

    const data = await api_call.json();

    //returning an object, calling the key data and setting this value to that constant data above
    return { data }
};

const fetchUserRepos = async (user) =>
{
    const api_call_repos = await fetch(`https://api.github.com/users/${user}/repos?client_id=${client_id}&client_secret=${client_secret}`);

    const data = await api_call_repos.json();

    //returning an object, calling the key data and setting this value to that constant data above
    return { data }
};


const showData = () =>
{
    fetchUsers(inputValue.value).then((response) => 
    {
        console.log(response);

        var img = document.createElement("img");
        img.src = response.data.avatar_url;
        imgContainer.appendChild(img);

        nameContainer.innerHTML = `Name: <span class="main_profile-value">${response.data.name}</span>`;

        unContainer.innerHTML = `Username: <span class="main_profile-value">${response.data.login}</span>`;

        locationContainer.innerHTML = `Location: <span class="main_profile-value">${response.data.location}</span>`;

        emailContainer.innerHTML = `Email: <span class="main_profile-value">${response.data.email}</span>`;
        
        reposContainer.innerHTML = `Repos: <span class="main_profile-value">${response.data.public_repos}</span>`;

        urlContainer.innerHTML = `URL: <span class="main_profile-value">${response.data.html_url}</span>`;
    
        numOfGistsContainer.innerHTML = `Number of Gists: <span class="main_profile-value">${response.data.public_gists}</span>`;
    })

    fetchUserRepos(inputValue.value).then((response) =>
    {
        console.log(response);
        if(response.data[0].name != null)
        {
            console.log(response.data);

            var perrow = 1;
            var cellCount = 0;
            var table = document.createElement("table");
            row = table.insertRow();

            for(let i = 0; i < response.data.length; i++)
            {
                var cell = row.insertCell();
                cell.innerHTML = "Name:   " + response.data[i].name;

                var cell1 = row.insertCell();
                cell1.innerHTML = "Description:   " + response.data[i].description;
                              
                cellCount++;

                if(cellCount % perrow == 0)
                {
                    row = table.insertRow();
                }

                if(cellCount > 5)
                {
                    table.setAttribute("class", "scrollable");
                }
            }

            

            document.getElementById("userReposSectionInner").appendChild(table);
        }

    })

}

searchButton.addEventListener('click', () =>
{
    showData();
})


