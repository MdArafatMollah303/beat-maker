 class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.currentKick = './sounds/bubbles.mp3';
        this.snareKick = './sounds/clay.mp3';
        this.hihatKick = './sounds/cofetti.mp3';
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 200;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector(".tempo-slide");
    }
    activePad(){
        this.classList.toggle("active");
    }
    repeat(){
     let step = this.index % 6;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //loop
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
        
        //
        if(bar.classList.contains('active')){
            if(bar.classList.contains('kick-pad')){
                this.kickAudio.currentTime = 0;
                this.kickAudio.play();
            }
            if(bar.classList.contains('snare-pad')){
                this.snareAudio.currentTime=0;
                this.snareAudio.play();
            }
            if(bar.classList.contains('hihat-pad')){
                this.hihatAudio.currentTime = 0;
                this.hihatAudio.play();
            }
        }
        //
        });
        this.index++; 
    }
    start(){
        console.log(this);
        const interval = (60/this.bpm)*1000;
        if(!this.isPlaying){
       this.isPlaying= setInterval(()=>{ 
            this.repeat();
        },interval);
    }else{
        clearInterval(this.isPlaying)
        this.isPlaying = null;
    }
    }
    updateBtn(){
        if(!this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add('active');
        }
        else{
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove('active');
        }
    }
    changeSound(e){
        const Aname = e.target.name;
        console.log(Aname);
        const Value = e.target.value;
        console.log(Value);
        switch(Aname){
            case "kick-select":
                this.kickAudio.src = Value;
                break;
                case "snare-select":
                this.snareAudio.src = Value;
                break;
                case "hihat-select":
                this.hihatAudio.src = Value;
                break;
        }
    }
    mute(e){
        const muteIndex = e.target.getAttribute ("data-track");
        e.target.classList.toggle("active");
        if(e.target.classList.contains('active')){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                    case "1":
                    this.snareAudio.volume = 0;
                    break;
                    case "2":
                    this.hihatAudio.volume = 0;
                    break;       
            }
        }else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                    case "0":
                    this.snareAudio.volume = 1;
                    break;
                    case "0":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e){
        const tempoText = document.querySelector('.tempo-nr');
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }
    updateTempo(){
        
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if(playBtn.classList.contains(".active")){
            this.start();
        }
    }
}
const drumkit = new Drumkit();




drumkit.pads.forEach(pad => {
    pad.addEventListener("click", drumkit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation="";
    })
});

drumkit.playBtn.addEventListener("click", function(){
    drumkit.updateBtn();
    drumkit.start();
}) 

drumkit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumkit.changeSound(e);
    });
});

drumkit.muteBtns.forEach(btn => {
    btn.addEventListener("click", function(e){
        drumkit.mute(e);
    })
});

drumkit.tempoSlider.addEventListener('input', function(e){
    drumkit.changeTempo(e)
})
drumkit.tempoSlider.addEventListener('change', function(e){
    drumkit.updateTempo(e)
})