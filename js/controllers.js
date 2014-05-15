'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('HomeCtrl', ['$scope', '$http', 'about', function($scope, $http, about) {

        $http.get("datas/about.json")
                .success(function(data)
                {
                    console.log(data);
                }).
                error(function(data, status, headers, config) {
                    alert('error retrieving datas ' + status);
                });

        /* about.query(function(about) {
         $scope.about = about;
         console.log('Version : ' + $scope.about.version + ' developpeur : ' + $scope.about.developper);
         });*/
    }]);

appControllers.controller('PlayCtrl', ['$scope', 'config', function($scope, config) {
        // load init game conf
        config.query(function(conf) {
            $scope.config = conf;
            console.log($scope.config);
            init();
        });

        var audioContext = new window.webkitAudioContext();
        var position = 0;
        var notes = {1: 392, 2: 349.23, 3: 329.63, 4: 493.88};
        var sequence;
        // variable d'interval nécessaire pour faire un clear (ça évite d'avoir un comportement hératique après plusieurs lectures)
        var playSoundIntervalID;
        var userSequence = new Array();


        function init() {
            // générer aléatoirement une sequence de 4 chiffres dont les valeurs sont comprises entre 1 et 4
            sequence = "";
            for (var i = 0; i < $scope.config.itemlength; i++) {
                var number = getRandomNumber(1, $scope.config.itemlength);
                sequence += number;
                console.log(sequence);
            }
            userSequence = new Array();
            //window.document.getElementById('title').textContent = 'Level ' + $scope.config.level;
            playSoundIntervalID = setInterval(playSequence, $scope.config.intervall);
        }

        function playSequence() {
            var element_id = sequence.charAt(position);
            position++;

            if (position >= sequence.length) {
                window.clearInterval(playSoundIntervalID);
            }
            if (notes[element_id]) {
                createOscillator(element_id);
            }
        }

        // create an oscillator, play sound and change played element color
        function createOscillator(element_id) {

            var gain = audioContext.createGain();
            var osc = audioContext.createOscillator();
            var freq = notes[element_id];

            gain.connect(audioContext.destination);
            gain.gain.setValueAtTime(0, audioContext.currentTime);
            gain.gain.linearRampToValueAtTime(1, audioContext.currentTime + $scope.config.attack / 500);
            gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + $scope.config.decay / 500);

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

            $('.game-container').append(div);

            setTimeout(function() {
                osc.stop(0);
                osc.disconnect(gain);
                gain.disconnect(audioContext.destination);
                $(div).remove();
            }, $scope.config.decay);
        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        $scope.play = function($event) {
            var index = $event.target.id;
            console.log('index ' + index);
            var note = sequence.charAt(index - 1);
            console.log('note ' + note);
            createOscillator(index);

            // mise à jour du nombre de click effectués par le joueur
            $scope.config.userclicks++;
            // enregistrement des actions du joueur
            if ($scope.config.userclicks < sequence.length) {
                userSequence.push(note);
            }
            else {
                // push last played note
                userSequence.push(note);
                console.log('userSequence' + userSequence);
                console.log('auto sequence' + userSequence)
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
        };

        function verifEquality() {
            var equal = true;
            for (var i = 0; i < sequence.length; i++) {
                console.log('orig :: ' + sequence[i] + ' played :: ' + userSequence[i]);
                if (sequence[i] !== userSequence[i]) {
                    equal = false;
                    break;
                }
            }
            return equal;
        }

        function levelUp() {
            $scope.config.level++;
            // TODO générer aléatoirement un nombre dont la valeur est comprise entre 1 et 4 et l'ajouter à la sequence
            var number = getRandomNumber(1, $scope.config.itemlength);
            sequence += number;
            console.log('level up ' + sequence);

            // initialisation des actions du joueur et de la position de la lecture
            position = 0;
            $scope.config.userclicks = 0;
            userSequence = new Array();
            $scope.config.intervall = $scope.config.intervall * 0.85;
            playSoundIntervalID = setInterval(playSequence, $scope.config.intervall);
        }
    }]);

appControllers.controller('ScoresCtrl', ['$scope', 'scores', function($scope, scores) {
        $scope.scores = scores.query();
        $scope.orderProp = 'score';
    }]);
