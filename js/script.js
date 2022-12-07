const trigger = document.getElementById("trigger"); //根据id获取输入元素
const context = document.getElementById("context"); //根据id获取输入元素
const url = "https://note.youdao.com/s/XROsgZTt";
var strArray = null;

axios.get(url)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = writeSource; //设置回调函数
xmlHttp.open("GET", url, true);
xmlHttp.send(null);

if (trigger){
    trigger.addEventListener("click", getKey);
}

function writeSource() {
    if (xmlHttp.readyState == 4) {
        console.log(xmlHttp.responseText);
    }
}

var clickCount = 0;

function getKey() {
    clickCount++;
    if (clickCount == 3) {
        clickCount = 0;
        var keyStr = prompt("请输入密钥：");
        if (keyStr && strArray) {
            var keyArray = keyStr.split('');
            for (var i = 0; i < strArray.length; i++) {
                strArray[i] -= keyArray[i % keyArray.length];
            }
            context.innerHTML = strArray.toString();
            alert("尘封的秘密已经浮现");
        }
        else {
            alert("错误！请核对密钥或联系管理员");
        }
    } 
}