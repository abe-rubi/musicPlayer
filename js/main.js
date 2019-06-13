(function(){
  'use strict';

  // プレイリスト取得
  var listitems=document.querySelectorAll('li');  //querySelecotorAllの場合は配列(オブジェクト)で取得される

  for(var i=0;i<listitems.length;i++){
    // clickイベント設定
    listitems[i].addEventListener('click',    //配列（オブジェクト）で取得しているので、[]でインデックスを指定している
    (e)=>{      //(e)はアロー関数の引数。Eventオブジェクトが入っている
      var li=e.target;        //Eventオブジェクトの中のtargetプロパティ(値)がクリックされた要素
      playMusic(li);
    });
  }

  function playMusic(li){
    var file=li.getAttribute('data-file');      //要素の属性を取得する変数を作る(jQueryでいうattrと同じかも？)
    var audio=document.querySelector('audio');    //  querySelector＝cssのセレクタ指定(idやclass以外の方法)で要素を最初の一つだけ取得
    audio.setAttribute('src',file);   //要素の属性値を設定し、file変数で取得した場所にセットする=srcの"中"に取得したdata-file(曲データ)をセットする
    audio.play();   //audio変数で一つ目のaudio要素を取得しているので、それを再生させる指令
    console.log(audio);
    // activeな項目を変更
    var activeli=document.querySelector('.active'); //現在のactiveの項目を取得
    activeli.className='';    //現在activeがついている項目のclass属性を空にする
    li.className='active';    //target取得が入った変数liによって、指定した項目にclass='active'を追加する
  }

  // 再生中と停止中でイラストを切り替える
  // audio要素で再生が開始されたときにはデフォルトでplayイベント、停止した時にはpauseイベントが発生する(終了時はendedイベント)
  // addEventListenerメソッドでそのイベントに対応する
  var audio=document.querySelector('audio');
  audio.addEventListener('play',
  (e)=>{
    var img=document.querySelector('img');
    img.setAttribute('src','play.png');
  });

  audio.addEventListener('pause',
  (e)=>{
    var img=document.querySelector('img');
    img.setAttribute('src','stop.png');
  });

  // 曲を最後まで再生した時
  audio.addEventListener('ended',     //endedのイベントを作る
  (e)=>{
    var img=document.querySelector('img');
    img.setAttribute('src','stop.png');
    // 次の曲に切り替え
    var activeli=document.querySelector('.active');
    var nextli=activeli.nextElementSibling;   //次の要素を取得(siblingプロパティ)
    // 確認用console.log('active'+activeli+activeli.getAttribute('data-file'));
    // 確認用console.log('next'+nextli+nextli.getAttribute('data-file'));

    // DOMとは、(Document Object Model)documentオブジェクトやElementオブジェクトが持っている要素を取得するための仕組みのこと。
    // HTML内のテキストやコメントを取得するプロパティもある.

    if(nextli!=null){
      playMusic(nextli);  //active要素をつけた次の要素を再生する
    }
  });

  // ランダム選曲機能追加
  var random=document.querySelector('#random');
  random.addEventListener('click',
  (e)=>{
    e.preventDefault(); // a要素本来の機能を無効にする
    // 確認用console.log('ランダム!');
    var listitems=document.querySelectorAll('li');
    var len=listitems.length;
    var rnd=Math.floor(Math.random()*len);  //曲数分のランダム選択肢を準備
    playMusic(listitems[rnd]);  //曲を再生
  });


})();
