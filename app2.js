function data() {
    return [
        {
            name: 'Melodiya', 
            track: 'https://mp3.chillhop.com/serve.php/?mp3=16060',
            img: 'https://picsum.photos/200/300',
            background: '#6a83b3'
        },
        {
            name: 'Soul Samba',
            track: 'https://mp3.chillhop.com/serve.php/?mp3=16063',
            img: 'https://picsum.photos/200/301',
            background: '#6ab1b3'
        },
        {
            name: 'Chrome & Tar',
            track: 'https://mp3.chillhop.com/serve.php/?mp3=16064',
            img: 'https://picsum.photos/200/302',
            background: '#b3a26a'
        },
        {
            name: 'Black Sands',
            track: 'https://mp3.chillhop.com/serve.php/?mp3=16066',
            img: 'https://picsum.photos/200/303',
            background: '#b36a6a'
        }
    ];
}



class MusicPlayer {
    constructor() {
        this.music = document.querySelector('audio');
        this.playBtn = document.querySelector('.play');
        this.prevBtn = document.querySelector('.prev-button');
        this.nextBtn = document.querySelector('.next-button');
        this.musicName = document.querySelector('.name h1');
        this.slider = document.querySelector('.slider');
        this.muteBtn = document.querySelector('.mute-button');  
        this.album = document.querySelector('img');
        this.musicPlayerBg = document.querySelector('.music-player');
        this.isPlaying = false;
        this.flag = false;
        this.count = 0;
        this.songArr = data();
        this.index = 0;
    } 
    
    
    play() {  
        if (this.flag) {
            this.flag = false;  
            this.playBtn.innerHTML = `<i class="fas fa-play"></i>`; 
            this.music.pause();
            clearInterval(this.isPlaying);
            this.isPlaying = null; 
        }
        else {
            this.flag = true; 
            this.playBtn.innerHTML= `<i class='fas fa-pause'></i>`;  
            this.music.play();  
            this.isPlaying = setInterval(() => {
                this.slider.max = this.music.duration;
                this.slider.value = this.music.currentTime;
                if(this.muteBtn.classList.contains('mute')) {
                    this.music.volume = 0;
                }
                else {
                    this.music.volume = 1;
                }   
                if (this.slider.value == parseInt(this.music.duration)) {
                    this.flag = false;
                    this.setNext();
                    player.updateNameMusic();  
                    player.play();
                }
            }, 1000)
        }
    }
    updateNameMusic() { 
        this.musicName.innerText =  this.songArr[this.index].name; 
        this.music.src = this.songArr[this.index].track;  
        this.album.src = this.songArr[this.index].img;
        this.musicPlayerBg.style.background = this.songArr[this.index].background;
    } 

    setNext() {
        this.slider.value = 0;  
        this.index++; 
        this.index = this.index % this.songArr.length;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
    }
    
    setPrev() {
        this.slider.value = 0;
        if (this.index == 0) { 
            this.index = this.songArr.length;
        }
        this.index--; 
        clearInterval(this.isPlaying);
        this.isPlaying = null;
    }
 
}

const player = new MusicPlayer(); 

player.updateNameMusic(); 

player.playBtn.addEventListener('click', function() { 
    // player.slider.max =player.music.duration;
    player.play(); 
})

player.nextBtn.addEventListener('click', function() { 
    player.flag = false; 
    player.setNext();
    player.updateNameMusic();   
    player.play();
})

player.prevBtn.addEventListener('click', function() {
    player.flag = false;
    player.setPrev();
    player.updateNameMusic(); 
    player.play();
})


player.slider.addEventListener('change', function() { 
    player.music.currentTime = player.slider.value; 
})

player.muteBtn.addEventListener('click', function() {
    player.muteBtn.classList.toggle('mute'); 
})

document.addEventListener('keypress', function(e) {
    console.log (e)
    if (e.code === 'Space'){
        player.play();
    }
})