"use strict";

// 音频数据
var fm_data = {};
var mp3_data = {};

//是否启用FM的音频
var fm_data_enable = false;

try {
  $.ajax({
    url: '/music/data/fm-data.json',
    async: true,
    dataType: "json",
    success: function(data) {
      fm_data = data;

      $.ajax({
        url: '/music/data/mp3-data.json',
        async: true,
        dataType: "json",
        success: function(data) {
          mp3_data = data;

          prepareData(fm_data, mp3_data);
          initAplayer(mp3_data);
        }
      });
    }
  });
} catch (err) {
  console.error(err);
}

// 从FM音频列表中随机取多个音频放入MP3音频列表
function prepareData(fm_data, mp3_data) {
  if(!fm_data_enable){
    return;
  }
  var num = 4;
  var min = 0;
  var index = 0;
  var max = fm_data.total;
  if (max > num) {
    while (index < num) {
      index = index + 1;
      var rand = parseInt(Math.random() * (max - min + 1) + min);
      if (rand >= max) {
        continue;
      }
      mp3_data.list.push(fm_data.list[rand]);
      fm_data.list.splice(rand, 1);
    }
  }
}

// 初始化音频播放器
function initAplayer(mp3_data) {
  var ap = new APlayer({
    container: document.getElementById('aplayer'),
    autoplay: false, //自动播放
    listFolded: true, //播放列表默认折叠
    listMaxHeight: 90, //播放列表最大高度
    order: 'list', //音频循环顺序, 可选值: 'list', 'random'
    loop: 'all', //音频循环播放, 可选值: 'all', 'one', 'none'
    theme: '#e9e9e9', //切换音频时的主题色，优先级低于audio.theme
    preload: 'none', //音频预加载，可选值: 'none', 'metadata', 'auto'
    mutex: true, //互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
    lrcType: 3, //歌词格式，可选值：3（LRC文件歌词格式），1（JS字符串歌词格式）
    volume: 0.7, //默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
    fixed: true, //吸底模式（fixed:true），迷你模式（mini:true），普通模式（注释此行或者设置fixed:false）
    audio: mp3_data.list //音频列表(JSON数组格式)
  });

  //切换音频时，根据音频封面自适应主题色
  var colorThief = new ColorThief();
  var setTheme = (index) => {
    if (!ap.list.audios[index].theme) {
      colorThief.getColorAsync(ap.list.audios[index].cover, function(color) {
        ap.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index);
      });
    }
  };

  setTheme(ap.list.index);
  ap.on('listswitch', (data) => {
    setTheme(data.index);
  });
}
