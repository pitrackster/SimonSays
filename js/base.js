 var audioContext = new window.webkitAudioContext();
            var position = 0;
            var notes = {1: 392, 2: 349.23, 3: 329.63, 4: 493.88};
            var sequence;
            var attack = 10;
            var decay = 250;
            var intervalTime = 1000;
            // variable d'interval nécessaire pour faire un clear (ça évite d'avoir un comportement hératique après plusieurs lectures)
            var myInterval;

            // game datas
            var nbClick;
            var userSequence = new Array();
            var level;

            window.addEventListener('load', init, false);

            // init
            function init() {
                // générer aléatoirement une sequence de 4 chiffres dont les valeurs sont comprises entre 1 et 4
                sequence = "";        
                 for(i = 0; i < 4; i++){
                    var number = getRandomNumber(1, 4);
                    console.log(number);
                    sequence += number;
                    console.log(sequence);
                }
                level = 1;
                nbClick = 0;
                userSequence = new Array();
                window.document.getElementById('title').textContent = 'Level ' + level;
                myInterval = setInterval(playSequence, intervalTime);
            }

            function levelUp() {
                level++;
                // TODO générer aléatoirement un nombre dont la valeur est comprise entre 1 et 4 et l'ajouter à la sequence
                var number = getRandomNumber(1, 4);
                sequence += number;
                console.log('level up ' + sequence);
                window.document.getElementById('title').textContent = 'Level ' + level;

                // initialisation des actions du joueur et de la position de la lecture
                position = 0;
                nbClick = 0;
                userSequence = new Array();
                intervalTime = intervalTime * 0.85;
                myInterval = setInterval(playSequence, intervalTime);
            }

            // joue la sequence automatiquement
            function playSequence() {
                var element_id = sequence.charAt(position);
                position++;

                if (position >= sequence.length) {
                    window.clearInterval(myInterval);
                }
                if (notes[element_id]) {
                    createOscillator(element_id);
                }
            }

            // joue le son de l'élément clické
            function play(element) {
                var index = element.id;
                var note = sequence.charAt(index - 1);
                createOscillator(index);

                // mise à jour du nombre de click effectués par le joueur
                nbClick++;
                // enregistrement des actions du joueur
                if (nbClick < sequence.length) {
                    userSequence.push(note);
                }
                else {
                    // push last played note
                    userSequence.push(note);
                    // vérifier égalité des deux array : sequence et userSquence
                    if (verifEquality()) {
                        // si OK passer level sup
                        levelUp();
                    }
                    else {
                        // si KO recommencer à 0
                        init();
                    }
                }
            }

            // create an oscillator, play sound and change played element color
            function createOscillator(element_id) {

                var gain = audioContext.createGain();
                var osc = audioContext.createOscillator();
                var freq = notes[element_id];

                gain.connect(audioContext.destination);
                gain.gain.setValueAtTime(0, audioContext.currentTime);
                gain.gain.linearRampToValueAtTime(1, audioContext.currentTime + attack / 500);
                gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + decay / 500);

                osc.frequency.value = freq;
                osc.type = "sawtooth";
                osc.connect(gain);
                osc.start(0);

                // modification graphique du "carré" joué 
                var element = window.document.getElementById(element_id);
                var ePosition = element.getBoundingClientRect();
                var x = ePosition.left;
                var y = ePosition.top;
                var div = document.createElement('div');
                $(div).css('top', y)
                        .css('left', x)
                        .addClass('highlight');

                $('#squareContainer').append(div);

                setTimeout(function() {
                    osc.stop(0);
                    osc.disconnect(gain);
                    gain.disconnect(audioContext.destination);
                    $(div).remove();
                }, decay);
            }

            function verifEquality() {
                var equal = true;
                for (i = 0; i < sequence.length; i++) {
                    //console.log('orig :: ' + sequence[i] + ' played :: ' + userSequence[i]);
                    if (sequence[i] !== userSequence[i]) {
                        equal = false;
                        break;
                    }
                }
                return equal;
            }

            function getRandomNumber(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            }