// blur background on options button click
document.getElementById("options").addEventListener('click', function(){
    let m = document.getElementById("popup").classList;
    m.toggle("shown");
    m.toggle("hidden");
}, false);

// blur background on popup click
document.getElementById("popup").addEventListener('click', function(event){
    let m = document.getElementById("popup").classList;
    if(event.target === this){
        m.toggle("shown");
        m.toggle("hidden");
    }
}, false);

// change page colors
function color(event){
    document.getElementById("main").style.background = event.value;
    document.getElementsByTagName("header")[0].style.background = event.value;
}

// called on input change
function format(){
    if(document.getElementById("input").value.length > 0)
        document.getElementById("output").textContent = scrubText();
    else
        document.getElementById("output").textContent = "";
}

// copy output with button press
function copyOut(){
    document.getElementById("output").select();
    document.execCommand('copy');
}

// formats with proper capitalization and page numbers
function scrubText()
{
    let text = document.getElementById("input").value;
    let fixed = "\u201C" + text.replace(/(\r\n|\r|\n)/gm, " ").replace(/"/gm, "'").replace(/-\s+/gm, "").trim() + "\u201D";
    let author = document.getElementById("authorIn").value;
    let page = document.getElementById("pageNum").value;
    if(author.length === 0 && page.length === 0){
        return fixed.replace(/\s+/g, " ");
    }
    else{
        fixed = fixed.replace(/\s+/gm, " ") + " ";
        let cite = "";
        if(author.length > 0 && /\S/.test(author)){
            // create array of names, for each element capitalize first letter and join to rest of name,
            // then join all names together into string
            cite = author.split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
            cite = cite.replace(/\sAnd\s/, " and ").replace(/\sEt Al\./, " et al.");
        }
        if(page.length > 0 && /\S/.test(page)){
            if(cite.length > 0)
                cite += " " + page;
            else{
                cite = page;
            }
        }
        fixed += "(" + cite + ")";
    }
    return fixed;
}