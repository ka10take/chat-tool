/**
 * チャットの追加をするオブジェクト
 * @param {obj} acount - アカウント情報
 */
var AddChat = function(acount) {
    var self = this;
    self.acountIcon = acount.icon;
    self.acountName = acount.name;
    self.selectBtnId = acount.btnId;
    self.acountSide = acount.side;
    self.chatText = '';

    /**
     * 指定のボタンがクリックされた時
     */
    var $btn = document.getElementById(self.selectBtnId);
    $btn.addEventListener('click', _addChat);

    /**
     * チャットを追加するための関数
     */
    function _addChat() {
        var $div = _setChat();
        if (!self.chatText) { return; }

        var $body = document.getElementById('js-chat-box');
        $body.appendChild($div);

        _scrollDown();
    }

    /**
     * チャットバルーンとアカウント情報の二つの要素を一つにまとめる関数
     * @return {Node} - 生成されたチャット要素
     */
    function _setChat() {
        self.chatText = _getChatText();
        _clearText();

        var $ballon = _createBallon(self.chatText);
        var $acountInfo = _createAcountInfo(self.acountName, self.acountIcon);

        var $div = document.createElement('div');

        (self.acountSide) ? $div.className = 'acount acount-left': $div.className = 'acount acount-right';

        $div.appendChild($acountInfo);
        $div.appendChild($ballon);

        return $div;
    }

    /**
     * 指定のテキストボックスから文字列を取得する関数
     * @return {string} - エスケープされた文字列
     */
    function　 _getChatText() {
        var chatText = document.getElementById('js-chat-text').value;
        return _escapeHTML(chatText);
    }

    /**
     * 文字をエスケープする関数
     * @param {string} str - テキストボックに入力された文字列
     * @return {string} - エスケープされた文字列
     */
    function　 _escapeHTML(str) {
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/'/g, '&#39;');
        str = str.replace(/^[\s]+|[\s]+$/g, '');
        return str;
    }

    /**
     * 指定のテキストボックスの中身を空にする関数
     */
    function　 _clearText() {
        var $chatText = document.getElementById('js-chat-text');
        $chatText.value = '';
    }

    /**
     * チャットバルーンを生成する関数
     * @param {string} chatText - エスケープされた文字列
     * @return {Node} - 生成されたチャットバルーン要素
     */
    function　 _createBallon(chatText) {
        var $div = document.createElement('div');
        $div.className = 'ballon';
        $div.innerHTML = chatText;
        return $div;
    }

    /**
     * アカウント情報を生成する関数
     * @param {string} acountName - アカウント名
     * @param {string} acountIcon - アイコン画像のソース
     * @return {Node} - 生成されたアカウント情報要素
     */
    function　 _createAcountInfo(acountName, acountIcon) {
        var $div = document.createElement('div');
        $div.className = 'acount-info';

        var $img = document.createElement('img');
        $img.className = 'acount-icon';
        $img.src = acountIcon;

        var $span = document.createElement('span');
        $span.className = 'acount-name';
        $span.innerHTML = acountName;

        $div.appendChild($img);
        $div.appendChild($span);
        return $div;
    }

    /**
     * チャット画面の下まで自動スクロールする関数
     */
    function　 _scrollDown() {
        var $chatBox = document.getElementById('js-chat-box');
        $chatBox.scrollTop = $chatBox.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var myInfo = {
        name: '自分', //アカウント名
        icon: 'assets/img/仮面ライダー（コーナー）.png', //アイコン画像ソース
        side: true, //左右判定（左：true/右：false）
        btnId: 'js-my-chat' //連携するボタンID
    }

    var yourInfo = {
        name: 'あなた',
        icon: 'assets/img/71T86JBdBmL.jpg',
        side: false,
        btnId: 'js-your-chat'
    }

    var myChat = new AddChat(myInfo);
    var yourChat = new AddChat(yourInfo);
});