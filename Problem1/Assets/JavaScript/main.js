var insert_header_row = true;

function createEntry() 
{
    validate = validation();

    if (validate)
    {
        if (insert_header_row)
        {
            createHeaders();
            insert_header_row = false;
        }

        var tableBody = document.getElementById('myTable');
        var name = document.getElementById('name').value;
        var phone = document.getElementById('phone').value;
        var email = document.getElementById('email').value;

        var tbody = ''
        tbody += '<tr>';
        tbody += '<td>';
        tbody += '<td>';
        tbody += '</td>';

        let row = tableBody.insertRow(-1);
        let cell = row.insertCell(-1);
        let cell2 = row.insertCell(-1);
        let cell3 = row.insertCell(-1);

        let text = document.createTextNode(name);
        let text2 = document.createTextNode(phone);
        let text3 = document.createTextNode(email);

        cell.appendChild(text);
        cell2.appendChild(text2);
        cell3.appendChild(text3);

        document.getElementById("contact").reset();

        cell.id="name";

    }

    else
    {
        errorMessage.style.display = "block";
    }
}

function validation() 
{
    var special_characters = /^[0-9]+$/;
    var letter_characters = /^[A-Za-z]+$/; 
    var email_sytax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 
    var name = document.getElementById('name').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var email = document.getElementById('email').value.trim();
    var errorMessage = document.getElementById("errorMessage");

    errorMessage.style.display = "hidden";

 

    if(name === '' || phone === '' || email === '') 
    {
        errorMessage.style.display = "block";
        return false;
    }

    else if(!name.match(letter_characters) || name.length > 20) 
    {
        errorMessage.style.display = "block";
        return false;
    }

    else if(!phone.match(special_characters) || phone.length != 10) 
    {
        errorMessage.style.display = "block";
        return false;
    }

 

    else if (!email.match(email_sytax) || email.length > 40)
    {
        errorMessage.style.display = "block";
        return false;
    }

    else
    {
        errorMessage.style.display = "hidden";
        return true;
    }
}


function createHeaders() 
{
    var tableBody = document.getElementById('myTable');
    var tbody = '';
    tbody += '<tr>';
    tbody += '<td>';
    tbody += '<td>';
    tbody += '</td>';

    let row = tableBody.insertRow(-1);
    let cell = row.insertCell(-1);
    let cell2 = row.insertCell(-1);
    let cell3 = row.insertCell(-1);
    let text3 = document.createTextNode("Email");

    cell3.appendChild(text3);
    
    var name_button = document.createElement("button")
    var phone_button = document.createElement("button")

    name_button.onclick = filter_name;
    phone_button.onclick = filter_phone;

    name_button.innerHTML = "<b>Name</b>";
    phone_button.innerHTML = "<b>phone</b>";
    cell3.innerHTML = "<b>Email</B>";

    name_button.id = "name_button";
    phone_button.id = "phone_button";

    cell.appendChild(name_button);
    cell2.appendChild(phone_button);
}

function filter_name() 
{
    sort_by_element = 0;
    sorting_algorithm(sort_by_element);
}

 

function filter_phone()
{
    sort_by_element = 1;
    sorting_algorithm(1);
}

 
function sorting_algorithm(sort_by_element) 
{

    let tableBody, rows, swap, index;
    let top, bottom, swap_rows, order;
    let counter = 0;

    tableBody = document.getElementById("myTable");
    swap = true;
    order = "ascending"; 
    
    while (swap) 
    {
        swap = false;
        rows = tableBody.rows;     

        for (index = 1; index < (rows.length - 1); index++) 
        {
            swap_rows = false;
            bottom = rows[index + 1].getElementsByTagName("TD")[sort_by_element];
            top = rows[index].getElementsByTagName("TD")[sort_by_element];

            if (order == "descending") 
            {
                if (top.innerHTML.toLowerCase() < bottom.innerHTML.toLowerCase()) 
                {
                    swap_rows = true;
                    break;
                }
            }

            else if (order == "ascending") 
            {
                if (top.innerHTML.toLowerCase() > bottom.innerHTML.toLowerCase()) 
                {
                    swap_rows= true;
                    break;
                }
            } 
        }

        if (swap_rows) 
        {
            rows[index].parentNode.insertBefore(rows[index + 1], rows[index]);
            swap = true;
            counter ++;      
        }

        else 
        {
            if (counter == 0 && order == "ascending") 
            {
                order = "descending";
                swap = true;
            }
        }
    }
}

function telSearch() 
{
    var input, text, index, txtValue, counter = 0;
    
    input = document.getElementById("myInput").value.trim();
    tableBody = document.getElementById("myTable");
    rows = tableBody.rows;
    input = input.toUpperCase();

    for (index = 1; index < (rows.length); index++) 
    {
        text = rows[index].getElementsByTagName("TD")[1];
        txtValue = text.textContent || text.innerText;

        if (txtValue.toUpperCase().indexOf(input) > -1) 
        {
            rows[index].style.display = "";
        } 

        else
        {
            rows[index].style.display = "none";
            counter++;
        }
    }

    if (counter === (rows.length - 1)) 
    {
        null_search.style.display = "block";
    }
}