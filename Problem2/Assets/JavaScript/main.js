// Question 1 from Part 2

fetch('https://jsonplaceholder.typicode.com/posts').then(response => 
{
    return response.json()

})
.then(data => 
{
    console.log(data);
    console.log("The following post titles have more than 6 words: ")

    obj = data.map(posts => 
    {
        var newObj = posts.title;
        
        return newObj;

    });

    obj.map(element => 
    {
        var spaceCount = (element.split(" ").length - 1);
        if (spaceCount >= 6) 
        {
            console.log(element);
        }  
    });  
});

// Question 2 from Part 2
fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
.then(data => 
{
    obj = data.map(book => 
    {
        var newObj = book.body;

        return newObj;
    });

    wordFreq(obj);
});

function wordFreq(data)
{
    var array = [];
    for(var i=0; i < data.length; i++)
    {
        array.push(data[i]); 
    }

    var words = new Array();
    var x = array.toString();

    words = x.split(" ");
    var unique_word = {};

    for (var i = 0; i < words.length; i++) 
    {
        var word = words[i];

        if (word in unique_word)
        {
            var count  = unique_word[word];
            count ++;
            unique_word[word] = count;
        }
        else
        {
            unique_word[word] = 1;
        }
    }
    console.log("The word frequency map is: ")
    console.log(unique_word);
}