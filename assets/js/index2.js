/**
 * チャットを作成するオブジェクト
 * @param {string} name 
 * @param {string} image 
 * @param {string} side 
 * @param {boolean} btn 
 */
var CreateChat = function(name, image, side, btn) {
    this.acountIcon = image;
    this.acountName = name;
    this.acountSide = side;
    this.btn = btn;
    this.chatText = '';
    this.ballon = '';
    this.acountInfo = '';

    this.getChatText = function() {
        var chat = document.getElementById('js-chat-text');
        var chatText = chat.value;
        chatText.split('');
        var escapeChatText = _escapeHTML(chatText);
        this.chatText = escapeChatText;
        chat.value = '';
    }

    var _escapeHTML = function(str) {
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/'/g, '&#39;');
        return str;
    }

    this.createBallon = function() {
        var div = document.createElement('div');
        div.className = 'ballon';
        div.innerHTML = this.chatText;
        this.ballon = div;
    }

    this.createAcountInfo = function() {
        var div = document.createElement('div');
        div.className = 'acount-info';

        var img = document.createElement('img');
        img.className = 'acount-icon';
        img.src = this.acountIcon;

        var span = document.createElement('span');
        span.className = 'acount-name';
        span.innerHTML = this.acountName;

        div.appendChild(img);
        div.appendChild(span);
        this.acountInfo = div;
    }

    this.scrollDown = function() {
        var obj = document.getElementById('js-chat-box');
        obj.scrollTop = obj.scrollHeight;
        window.scroll(0, 0);
    }
}

AddChat.prototype = {
    //メソッド
    addChat: function() {
        this.getChatText();

        if (!this.chatText) {
            return;
        }

        this.createBallon();
        this.createAcountInfo();

        var div = document.createElement('div');

        (this.acountSide) ? div.className = 'acount acount-left': div.className = 'acount acount-right';

        div.appendChild(this.acountInfo);
        div.appendChild(this.ballon);

        var body = document.getElementById('js-chat-box');
        body.appendChild(div);

        this.scrollDown();
    }
}