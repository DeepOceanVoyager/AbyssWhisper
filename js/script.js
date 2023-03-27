const trigger = document.getElementById("trigger"); //根据id获取输入元素
const abyss = document.getElementById("abyss"); //根据id获取输入元素
const context = document.getElementById("context"); //根据id获取输入元素
const url = "https://api.github.com/repos/nddszy/nddszy.github.io/issues?filter=updated";
var codeStr = null; //从github获得的密文
var keyStr = null; //用户输入的密钥

if (trigger){
    trigger.addEventListener("click", getCodeFromGit);
}

if (abyss) {
    abyss.addEventListener("click", getCode);
}

var clickCount = 0;
function getCodeFromGit() {
    clickCount++;
    if (clickCount == 3) {
        clickCount = 0;
        if (!codeStr) {
            $.getJSON(url, function (data) {
                if (data.length > 0) {
                    codeStr = data[0].body;
                    ShowStr();
                }
                else {
                    console.log("访问失效");
                }
            });
            getKey();
        }
        else {
            getKey();
            ShowStr();
        }
    } 
}

function getKey() {
    var key = prompt("请输入密钥：");
    if (key) {
        keyStr = key;
    }
}

function ShowStr() {
    if (keyStr && codeStr) {
        context.innerHTML = fromCode(codeStr, keyStr);
        alert("尘封的秘密已经浮现");
    }
    else {
        alert("错误！请核对密钥或联系管理员");
    }
}

var callCount = 0;
function getCode() {
    callCount++;
    if (callCount == 3) {
        callCount = 0;
        getKey();
        var contentStr = prompt("请输入谜底：");
        if (keyStr && contentStr) {
            var strArroy=contentStr.split(/[(\r\n)\r\n]+/); //根据换行符拆分成数组 
            strArray.forEach((item,index)=>{
                if(!item){
                      strArray.splice(index,1);
                  }
            }) //删除空项
            var str=strArray.join("<br>");
            context.innerHTML = toCode(str, keyStr);
            alert("阴暗的种子已经埋下");
        }
        else {
            alert("错误！请核对密钥或联系管理员");
        }
    }
}

function toCode(str,key) {  //加密字符串
    var st = key.length;  //获取密钥的长度
    var s = "", b;  //定义临时变量
    for (var i = 0; i < str.length; i++) {  //遍历字符串
        b = str.charCodeAt(i);  //逐个提取每个字符，并获取Unicode编码值
        b += key.charCodeAt(i % st);
        s += b.toString() + " ";
    }
    return s;  //返回这些映射的字符
} 

function fromCode(str, key) {  //解密字符串
    var st = key.length;  //获取密钥的长度
    var strArray = str.split(" ");
    var s = "", b;  //定义临时变量
    for (var i = 0; i < strArray.length; i++) {  //遍历字符串
        b = parseInt(strArray[i]);
        b -= key.charCodeAt(i % st);
        s += String.fromCharCode(b);
    }
    return s;  //返回这些映射的字符
}
