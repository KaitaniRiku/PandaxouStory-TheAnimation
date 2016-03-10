$(document).ready(function(){

    /**
    *
    * Définition des variables
    *
    */
    var $btnPlayPause = $('#btn-play-pause');
    var $loveBar = $('#love_bar');
    var $loveBarProgress = $('#love_bar div');
    var $timon_pumba = $('#timon_pumba');
    var $pandaxou = $('#pandaxou');
    var $sharonoux = $('#sharonoux');
    var $baby_panda = $('#baby_panda');
    var $baby_tiger = $('#baby_tiger');
    var $pandaxou_broken_heart_img = $('#pandaxou_broken_heart_img');
    var $sharonoux_broken_heart_img = $('#sharonoux_broken_heart_img');
    var $pandaxou_bubble = $('#pandaxou .bubble');
    var $sharonoux_bubble = $('#sharonoux .bubble');
    var $narrator_bubble = $('#narrator_bubble');
    var $narrator_bubble2 = $('#narrator_bubble2');
    var $narrator_bubble3 = $('#narrator_bubble3');
    var $cup_tea = $('#cup_tea');
    var $cup_tea2 = $('#cup_tea2');
    var $sakura_tree = $('#sakura_tree');
    var $tv = $('#tv');
    var $heart = $('#heart');
    var $house = $('#house');
    var $snowman = $('#snowman');
    var $all = $('#starry_sky_container').children().not($btnPlayPause);
    var $toBeContinued = $('#to_be_continued');
    var $no_exist = $('.non_exist');
    var $reloadButton = $('#reload_button');


    /**
    *
    * Masquage d'éléments 
    *
    */
    $pandaxou_broken_heart_img.hide();
    $sharonoux_broken_heart_img.hide();
    $sharonoux_bubble.hide();
    $pandaxou_bubble.hide();


    /**
    *
    * Choix de la piste musicale
    *
    */
    $('.link_song').on('click', function(){
        $(this).attr('id', 'active_music');

        $('.link_song').not($(this)).animate({'opacity': 0}, 400, function(){
            $('#choice_container').fadeOut(800, function(){
                $btnPlayPause.fadeIn(800);
            })
        })
    })


    $reloadButton.on('click', function(){
        window.location.href="index.php";
    })


    /**
    *
    * Fonction de remplacement de class
    *
    */
    function replaceClass(element, oldClass, newClass){
      return element.removeClass(oldClass).addClass(newClass);
    }


    /**
    *
    * Extensions Jquery contenant les actions répétés dans l'animation
    * Mise en application des principes de recursivité et de callback
    *
    */

    /**
    * Animation de l'apparition de la pleine lune
    */
    $.fn.moonAppearing = function(callback){
        return this.each(function(){
            $(this).animate({'top' : 15}, 1000, function(){
                $(this).animate({'left' : 55}, 1200, function(){
                    $(this).css({'background-color': '#fff', 'box-shadow': '0px 0px 15px #fff'}).animate({
                        'width' : '155px',
                        'height' : '155px',
                    }, 1000, function(){
                        typeof callback == 'function' && callback.call(this);
                    });
                });
            });
        });
    }

    /**
    * Animation de l'affichage d'une bulle de narration
    */    
    $.fn.displayBubble = function(whichBubble, posLeft, posTop, width, callback){
        return this.each(function(){
            paramAnimate1 = {};
            paramAnimate1[whichBubble] = posLeft[0]

            $(this).animate(paramAnimate1, posLeft[1], function(){
                $(this).animate({'top' : posTop[0]}, posTop[1], function(){
                    $(this).animate({'width' : width[0]}, width[1], function(){
                        typeof callback == 'function' && callback.call(this);
                    });
                });
            });
        });
    }

    /*
    * Animation du masquage d'une bulle de narration
    */
    $.fn.hideBubble = function(whichBubble, width, posTop, posLeft, callback){
        return this.each(function(){
            paramAnimate1 = {};
            paramAnimate1[whichBubble] = posLeft[0]

            $(this).animate({'width' : width[0]}, width[1], function(){
                $(this).animate({'top' : posTop[0]}, posTop[1], function(){
                    $(this).animate(paramAnimate1, posLeft[1], function(){
                        typeof callback == 'function' && callback.call(this);
                    });
                });
            });
        });
    }

    /*
    * Animation du défilement des contenu texte des dialogue dans les bubbles
    */
    $.fn.displayBubbleMessages = function(bubbleType, text, startPosLeft, speed, callback, i){
        return this.each(function(){
            $bubble = $(this)
            i = typeof i === "undefined" ? 0 : i;

            if(i < 1){
                $bubble.find('div p').show().text(text[i]).css('left', startPosLeft).animate({'left' : '0px'}, speed, function(){
                    if(i+1 >= text.length){
                        if(bubbleType === 'special'){
                            $bubble.find('div p').fadeOut(800, function(){
                                $bubble.find('div p').text('');
                                typeof callback == 'function' && callback.call(this);
                            });
                        } else {
                            $bubble.find('div p').fadeOut(800, function(){
                                $bubble.find('div p').text('');
                            });
                            
                            $bubble.fadeOut(800, function(){
                                typeof callback == 'function' && callback.call(this);
                            });
                        }
                    } else {
                        $bubble.displayBubbleMessages(bubbleType, text, startPosLeft, speed, callback, i+1)
                    }
                });
            } else {
                $bubble.find('div p').fadeOut(800, function(){
                    $bubble.find('div p').show().text(text[i]).css('left', startPosLeft).animate({'left' : '0px'}, speed, function(){ 
                        if(i+1 >= text.length){
                            if(bubbleType === 'special'){
                                $bubble.find('div p').fadeOut(800, function(){
                                    $bubble.find('div p').text('');
                                    typeof callback == 'function' && callback.call(this);
                                });
                            } else {
                                $bubble.find('div p').fadeOut(800, function(){
                                    $bubble.find('div p').text('');
                                });
                                
                                $bubble.fadeOut(800, function(){
                                    typeof callback == 'function' && callback.call(this);
                                });
                            }
                        } else {
                            $bubble.displayBubbleMessages(bubbleType, text, startPosLeft, speed, callback, i+1)
                        }
                    });
                });
            }
        });
    }

    /*
    * Animation pour l'enchainement de petit déplacement successifs en top, left, right, bottom
    */
    $.fn.shakingMouvements = function(movesDirectionAmplitudeSpeed, callback, i){
        return this.each(function(){
            $element = $(this);
            i = typeof i === "undefined" ? 0 : i;

            speed = movesDirectionAmplitudeSpeed[i][1];

            $element.animate(movesDirectionAmplitudeSpeed[i][0], speed, function(){
                if(i+1 >= movesDirectionAmplitudeSpeed.length){
                    typeof callback == 'function' && callback.call(this);
                } else {
                    $element.shakingMouvements(movesDirectionAmplitudeSpeed, callback, i+1)
                }
            });
        });
    }

    /*
    * Animation pour le changement d'apparence des élement de l'animation
    */
    $.fn.transformation = function(newImage, callback){
        return this.each(function(){
            $(this).fadeOut(800, function(){
                $(this).fadeIn(1500).find('img').attr('src', newImage);

                typeof callback == 'function' && callback.call(this);
            });
        });
    }


    /**
    *
    * Lancement de l'animation avec un bouton faisant également office de play/pause button
    *
    */
    $btnPlayPause.on('click', function(){
        if(!$(this).hasClass('launched')){
            lauchAnimationFromStartToTeaServing();
        }
        $(this).addClass('launched');

        var icon = $(this).find('i');

        if(!icon.hasClass('glyphicon-play')){
            document.querySelector('#' + $('#active_music').attr('target')).pause();
            replaceClass(icon, 'glyphicon-pause', 'glyphicon-play');
        } else {
            document.querySelector('#' + $('#active_music').attr('target')).play();
            replaceClass(icon, 'glyphicon-play', 'glyphicon-pause');
        }
    });

    var hideBubblewidthSpeed = 800;
    var hideBibbleSideSpeed = 300;

    /**
    *
    * Lancement de l'animation du DEBUT jusque'à LA SCENE DU THE
    *
    */
    function lauchAnimationFromStartToTeaServing(){
        // Apparition de la lune
        $btnPlayPause.moonAppearing(function(){

            // Apparition de la bar de Love
            $loveBar.animate({'top' : '15px'}, 800, function(){
                $loveBarProgress.animate({'width' : '0%'}, 3000, function(){

                    // Apparition de Pandaxou
                    $pandaxou.fadeIn(1300, function(){
                        $pandaxou_broken_heart_img.fadeIn(1200, function(){

                            // Apparition de la bulle du narrateur + messages de narrations
                            $narrator_bubble.displayBubble('left', ['13%', 2000], ['52%', 600], ['350px', 1000], function(){
                                $(this).displayBubbleMessages('special', [
                                    "Pandaxou avait le coeur en morceaux...",
                                    "Sa vie devenait très triste...",
                                    "Mais un jour, la vie lui fit un cadeau...",
                                    "Un cadeau qui allait changer sa vie..."
                                ], "320px", 4000, function(){
                                    $narrator_bubble.hideBubble('left', ['0px', hideBubblewidthSpeed], ['68%', 400], ['-10px', 600], function(){

                                        // Apparition du cadeau avec mouvement de remoue
                                        $sharonoux.shakingMouvements([
                                            [{'top': '12%'}, 1500],
                                            [{'right': '42%'}, 200],
                                            [{'right': '43%'}, 200],
                                            [{'right': '42%'}, 200],
                                            [{'right': '43%'}, 200],
                                            [{'top': '10%'}, 200],
                                            [{'top': '12%'}, 200],
                                            [{'top': '10%'}, 200],
                                            [{'top': '12%'}, 200]
                                        ], function(){
                                            $sharonoux.transformation('www/assets/pictures/appear_tiger.png', function(){
                                                $sharonoux_bubble.fadeIn(800, function(){
                                                    $sharonoux_bubble.displayBubbleMessages('simple', ["Je me demande où est Pandaxou... :("], "300px", 3000, function(){
                                                            
                                                        // Nalouxx descend au niveau de Pandaxou
                                                        $sharonoux.animate({'top': '39%'}, 1000, function(){
                                                            $sharonoux.transformation('www/assets/pictures/tiger.png', function(){
                                                                $sharonoux.shakingMouvements([
                                                                    [{'right': '42%'}, 250],
                                                                    [{'right': '44%'}, 250],
                                                                    [{'right': '43%'}, 250]
                                                                ], function(){
                                                                    $sharonoux_bubble.fadeIn(800, function(){
                                                                        $sharonoux_bubble.displayBubbleMessages('simple', ['Ah le voilà!!! :)'], "300px", 3000, function(){
                                                                            $sharonoux.shakingMouvements([
                                                                                [{'top': '25%'}, 400],
                                                                                [{'top': '39%'}, 300],
                                                                                [{'right': '75%'}, 1300]
                                                                            ], function(){

                                                                                // Nalouxx va parler à Pandaxou
                                                                                $sharonoux_bubble.fadeIn(800, function(){
                                                                                    $sharonoux_bubble.displayBubbleMessages('simple', ["Pandaxou ça ne va pas?? :'( "], "300px", 3000, function(){
                                                                                        $sharonoux.shakingMouvements([
                                                                                            [{'right': '74%'}, 250],
                                                                                            [{'right': '76%'}, 250],
                                                                                            [{'right': '75%'}, 250]
                                                                                        ], function(){
                                                                                            $sharonoux_bubble.fadeIn(800, function(){
                                                                                                $sharonoux_bubble.displayBubbleMessages('simple', ["Réponds ou je te fais un câlin!! :D "], "300px", 3000, function(){
                                                                                                    $sharonoux.shakingMouvements([
                                                                                                        [{'right': '81%'}, 800],
                                                                                                        [{'top': '37%'}, 500],
                                                                                                        [{'top': '40%'}, 500],
                                                                                                        [{'top': '37%'}, 500],
                                                                                                        [{'top': '40%'}, 500]
                                                                                                    ], function(){
                                                                                                        $loveBarProgress.animate({'width' : '15%'}, 1000);
                                                                                                        $sharonoux.animate({'right': '70%'}, 800, function(){
                                                                                                            $pandaxou_broken_heart_img.fadeOut(1300, function(){

                                                                                                                // Pandaxou suis Nalouxx
                                                                                                                $pandaxou.shakingMouvements([
                                                                                                                    [{'left': '1%'}, 200],
                                                                                                                    [{'left': '0%'}, 200],
                                                                                                                    [{'left': '7%'}, 500]
                                                                                                                ], function(){
                                                                                                                    $sharonoux.animate({'right': '33%'}, 800);
                                                                                                                    $pandaxou.animate({'left': '33%'}, 1200, function(){

                                                                                                                        // Le thé est servie
                                                                                                                        $cup_tea.fadeIn(800);
                                                                                                                        $cup_tea2.fadeIn(800, function(){
                                                                                                                            $cup_tea.animate({'top': '53%'}, 1000);
                                                                                                                            $cup_tea2.animate({
                                                                                                                                'top': '53%',
                                                                                                                            }, 600, function(){
                                                                                                                                lauchAnimationFromTeaServingToEndOfTheFilm();
                                                                                                                            });
                                                                                                                        });
                                                                                                                    });
                                                                                                                });
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }


    /**
    *
    * Lancement de l'animation à partir de LA SCENE DU THE jusque'à LA FIN DU FILM
    *
    */
    function lauchAnimationFromTeaServingToEndOfTheFilm(){
        $pandaxou_bubble.fadeIn(800, function(){
            $pandaxou_bubble.displayBubbleMessages('simple', ["Je veux pas partir maintenant... :("], "300px", 3000, function(){
                $sharonoux_bubble.fadeIn(800, function(){
                    $sharonoux_bubble.displayBubbleMessages('simple', ["Alors reste avec moi!!! :P"], "300px", 3000, function(){
                        $pandaxou_bubble.fadeIn(800, function(){
                            $pandaxou_bubble.displayBubbleMessages('simple', ["Je peux??... :)"], "300px", 3000, function(){
                                $sharonoux_bubble.fadeIn(800, function(){
                                    $sharonoux_bubble.displayBubbleMessages('simple', ["Biensûr!!! :D"], "300px", 3000, function(){
                                        $loveBarProgress.animate({
                                            'width' : '25%',
                                        }, 1000, function(){
                                            $pandaxou.transformation('www/assets/pictures/panda.png', function(){
                                                $pandaxou.shakingMouvements([
                                                    [{'top': '30%'}, 400],
                                                    [{'top': '40%'}, 400]
                                                ], function(){
                                                    $pandaxou_bubble.fadeIn(800, function(){
                                                        $pandaxou_bubble.displayBubbleMessages('simple', ["Ok!!! On fait quoi?? :)))))))"], "300px", 3000, function(){
                                                            $sharonoux_bubble.fadeIn(800, function(){
                                                                $sharonoux_bubble.displayBubbleMessages('simple', ["On regarde Pitch Perfect 2?? :D"], "300px", 3000, function(){
                                                                    $pandaxou_bubble.fadeIn(800, function(){
                                                                        $pandaxou_bubble.displayBubbleMessages('simple', ["Ok c\'est part!! ^^"], "300px", 3000, function(){
                                                                            $cup_tea.animate({'top': '10%'}, 600, function(){
                                                                                $cup_tea.fadeOut(600)
                                                                            });
                                                                            $cup_tea2.animate({'top': '10%'}, 1000, function(){
                                                                                $cup_tea2.fadeOut(600, function(){
                                                                                    $pandaxou.css('z-index', '1');
                                                                                    $pandaxou.animate({'left': '65%'}, 1200, function(){
                                                                                        $sharonoux.animate({'right': '32%'}, 600, function(){
                                                                                            $tv.shakingMouvements([
                                                                                                [{'top': '20%'}, 1400],
                                                                                                [{'top': '30%'}, 400]
                                                                                            ], function(){
                                                                                                $pandaxou.animate({'left': '64%'}, 400, function(){
                                                                                                    $sharonoux.animate({'right': '30%'}, 400, function(){
                                                                                                        $sharonoux.fadeOut(1000, function(){
                                                                                                            $sharonoux.css({'width': '220px', 'top': '35%', 'right': '25%'}).fadeIn(1500).find('img').attr('src', 'www/assets/pictures/lying_tiger.png');
                                                                                                        })
                                                                                                        $pandaxou.fadeOut(1000, function(){
                                                                                                            $pandaxou.fadeIn(1500).find('img').attr('src', 'www/assets/pictures/panda_sit.png');
                                                                                                        })
                                                                                                        $loveBarProgress.animate({'width' : '35%'}, 3000, function(){
                                                                                                            $tv.shakingMouvements([
                                                                                                                [{'left': '25%'}, 250],
                                                                                                                [{'left': '27%'}, 250],
                                                                                                                [{'left': '25%'}, 250],
                                                                                                                [{'left': '27%'}, 250],
                                                                                                                [{'left': '25%', 'top': '28%'}, 250],
                                                                                                                [{'left': '27%', 'top': '30%'}, 250],
                                                                                                                [{'left': '25%'}, 250],
                                                                                                                [{'left': '27%', 'top': '28%'}, 250],
                                                                                                                [{'top': '29%'}, 250],
                                                                                                                [{'left': '24%'}, 250],
                                                                                                                [{'left': '27%'}, 250],
                                                                                                            ], function(){
                                                                                                                $loveBarProgress.animate({'width' : '45%'}, 1000, function(){
                                                                                                                    $pandaxou_bubble.css('left', '-55px').fadeIn().displayBubbleMessages('simple', ["Merci Nalouxx... ^^"], "300px", 3000, function(){
                                                                                                                        lauchAnimationFromEndOfTheFilmToLoveConfession();
                                                                                                                    });
                                                                                                                });
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }


    /**
    *
    * Lancement de l'animation à partir de LA FIN DU FILM jusque'aux CONFESSIONS AMOUREUSES
    *
    */
    function lauchAnimationFromEndOfTheFilmToLoveConfession(){
        $narrator_bubble.displayBubble('left', ['5%', 400], ['65%', 400], ['350px', 1000], function(){
            $(this).displayBubbleMessages('special', [
                "Cette nuit là, quelque chose est né...",
                "Pandaxou ne voulait plus quitter Nalouxx...",
                "Il se sentait heureux à nouveau...",
                "Et prenait conscience que c'était grâce à elle..."
            ], "320px", 3000, function(){
                $narrator_bubble.hideBubble('left', ['0px', hideBubblewidthSpeed], ['68%', 300], ['-10px', hideBibbleSideSpeed], function(){
                    $loveBarProgress.css('background-color', '#ef5350').parent().css('border', '2px #ef5350 solid').end().animate({
                        'width' : '55%',
                    }, 1000, function(){
                        $narrator_bubble2.displayBubble('right', ['5%', 400], ['65%', 400], ['350px', 1000], function(){
                            $(this).displayBubbleMessages('special', [
                                "Mais le plus étonnant...",
                                "C'est que cette nuit là...",
                                "Naloux a ressenti quelque chose d'inatendu...",
                                "Elle a donné son coeur à Pandaxou..."
                            ], "320px", 3000, function(){
                                $narrator_bubble2.hideBubble('right', ['0px', hideBubblewidthSpeed], ['68%', 300], ['-10px', hideBibbleSideSpeed], function(){
                                    $loveBarProgress.animate({'width' : '65%'}, 1000, function(){
                                        $tv.shakingMouvements([
                                            [{'top': '45%'}, 250],
                                            [{'top': '-400px'}, 600]
                                        ], function(){
                                            $sharonoux.fadeOut(1500, function(){
                                                $sharonoux.css({'width': '140px', 'top': '40%', 'right': '31%'}).fadeIn(1500).find('img').attr('src', 'www/assets/pictures/tiger.png');
                                            })
                                            $pandaxou.fadeOut(1500, function(){
                                                $pandaxou.fadeIn(1500).find('img').attr('src', 'www/assets/pictures/panda.png');
                                            })
                                            $sakura_tree.animate({'top' : '11%'}, 3000, function(){
                                                $pandaxou.animate({'left': '35%'}, 1200, function(){
                                                    $sharonoux.animate({'right': '35%'}, 600, function(){
                                                        $pandaxou_bubble.css('left', '-205px').fadeIn(800, function(){
                                                            $pandaxou_bubble.displayBubbleMessages('simple', ["Nalouxx... Je t\'aime..."], "300px", 3000, function(){
                                                                $sharonoux_bubble.fadeIn(800, function(){
                                                                    $sharonoux_bubble.displayBubbleMessages('simple', ["Comme les adultes??"], "300px", 3000, function(){
                                                                        $pandaxou_bubble.fadeIn(800, function(){
                                                                            $pandaxou_bubble.displayBubbleMessages('simple', ["Non...", "Pour de vrai... ^^"], "300px", 2000, function(){
                                                                                $pandaxou_broken_heart_img.css({'width': '42px', 'top': '53%'}).attr('src', 'www/assets/pictures/red_heart.png').fadeIn(1300, function(){
                                                                                    $sharonoux.fadeOut(1500, function(){
                                                                                        $sharonoux.css({'width': '150px', 'top': '41%'}).fadeIn(1500).find('#sharonoux_img').attr('src', 'www/assets/pictures/tiger2.png');
                                                                                    });
                                                                                    $sakura_tree.animate({'top' : '13%'}, 3000, function(){
                                                                                        $sharonoux_bubble.fadeIn(800, function(){
                                                                                            $sharonoux_bubble.find('div p').show().text('Moi aussi je t\'aime Pandaxou...').css('left', '300px').animate({
                                                                                                'left' : '0px',
                                                                                            }, 3000, function(){
                                                                                                lauchAnimationFromLoveConfessionToEnding();
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }


    /**
    *
    * Lancement de l'animation à partir des CONFESSIONS AMOUREUSES jusque'à LA FIN
    *
    */
    function lauchAnimationFromLoveConfessionToEnding(){
        $loveBarProgress.animate({
            'width' : '75%',
        }, 1000, function(){
            $sharonoux_bubble.fadeOut(800, function(){
                $sharonoux.fadeOut(1500, function(){
                    $pandaxou_broken_heart_img.hide();
                    $sharonoux.css({'width': '210px', 'top': '35%', 'right': '31%'}).fadeIn(1500).find('#sharonoux_img').attr('src', 'www/assets/pictures/lying_tiger.png');
                })
                $pandaxou.fadeOut(1500, function(){
                    $pandaxou.css({'width': '180px', 'top': '42%'}).fadeIn(1500).find('#pandaxou_img').attr('src', 'www/assets/pictures/lying_panda.png');
                })
                $sakura_tree.shakingMouvements([
                    [{'top': '10%'}, 3000],
                    [{'right': '15px'}, 1500]
                ], function(){
                    $pandaxou.css('z-index', '0').shakingMouvements([
                        [{'left': '40%'}, 800],
                        [{'left': '35%'}, 800]
                    ], function(){
                        $narrator_bubble.displayBubble('left', ['5%', 400], ['65%', 400], ['350px', 600], function(){
                            $(this).displayBubbleMessages('special', ["* Premier Bisou *"], "320px", 1800, function(){
                                $narrator_bubble.hideBubble('left', ['0px', hideBubblewidthSpeed], ['68%', 300], ['-10px', hideBibbleSideSpeed], function(){
                                    $loveBarProgress.animate({'width' : '85%'}, 1000, function(){
                                        $pandaxou.css('z-index', '1');
                                        $sharonoux.shakingMouvements([
                                            [{'right': '36%'}, 800],
                                            [{'top': '32%'}, 500],
                                            [{'top': '35%'}, 500],
                                            [{'top': '32%'}, 500],
                                            [{'top': '35%'}, 500],
                                            [{'right': '31%'}, 800],
                                        ], function(){
                                            $narrator_bubble2.displayBubble('right', ['5%', 400], ['65%', 400], ['350px', 600], function(){
                                                $(this).displayBubbleMessages('special', ["* Premier câlin d\'amoureux *"], "320px", 1800, function(){
                                                    $narrator_bubble2.hideBubble('right', ['0px', hideBubblewidthSpeed], ['68%', 300], ['-10px', hideBibbleSideSpeed], function(){
                                                        $loveBarProgress.animate({'width' : '100%'}, 1000, function(){
                                                            $pandaxou.animate({'left' : '40%'}, 400);
                                                            $sharonoux.animate({'right' : '36%'}, 400, function(){
                                                                $sharonoux.fadeOut(1000)
                                                                $pandaxou.fadeOut(1000, function(){
                                                                    $heart.fadeIn(800, function(){
                                                                        $heart.animate({'top' : '-100px'}, 4000, function(){
                                                                            $btnPlayPause.animate({'width' : '210px', 'height' : '210px'}, 800, function(){
                                                                                $sharonoux.css({'width': '240px', 'top': '32%', 'right': '40%'}).fadeIn(1500).find('img').attr('src', 'www/assets/pictures/lying_tiger.png');
                                                                                $pandaxou.css({'width': '170px', 'top': '37%', 'left': '48%'}).fadeIn(1500).find('img').attr('src', 'www/assets/pictures/panda_sit.png');
                                                                                $loveBarProgress.parent().css('border', '2px #90caf9 solid').end().css('background-color', '#90caf9').animate({
                                                                                    'width' : '0%',
                                                                                }, 2000, function(){
                                                                                    $loveBarProgress.animate({'width' : '100%'}, 1500, function(){
                                                                                        $house.animate({'left' : '15px'}, 1500, function(){
                                                                                            $snowman.fadeIn(1200, function(){
                                                                                                $pandaxou_bubble.css('left', '-55px').fadeIn();
                                                                                                $pandaxou_bubble.displayBubbleMessages('simple', ["Ne jouez pas trop loin les enfants!! ^^"], "300px", 3000, function(){
                                                                                                    $baby_panda.fadeIn(1200, function(){
                                                                                                        $baby_tiger.fadeIn(1200, function(){
                                                                                                            $narrator_bubble3.animate({'right' : '39%'}, 1000, function(){
                                                                                                                $narrator_bubble3.animate({'width' : '450px'}, 1000, function(){
                                                                                                                    $(this).displayBubbleMessages('special', [
                                                                                                                        "Nalouxx et Pandaxou finirent leurs vie ensemble...",
                                                                                                                        "Ils eurent deux bébés: Léa et David Chang...",
                                                                                                                        "Les miracles arrivent...",
                                                                                                                        "Il suffit d\'y croire... ^^"
                                                                                                                    ], "420px", 5000, function(){
                                                                                                                        $narrator_bubble3.animate({'width' : '0px'}, 1000, function(){
                                                                                                                            $narrator_bubble3.animate({'right' : '-10px'}, 1000, function(){
                                                                                                                                $no_exist.fadeOut(1500, function(){
                                                                                                                                    $all.fadeOut(1500, function(){
                                                                                                                                        $btnPlayPause.animate({'width' : '250px', 'height' : '250px'}, 1000, function(){
                                                                                                                                            $toBeContinued.show().animate({'left' : '33%'}, 3000, function(){
                                                                                                                                                $(this).find('p').fadeOut(1200, function(){
                                                                                                                                                    $reloadButton.show(800);
                                                                                                                                                });
                                                                                                                                            });
                                                                                                                                        })
                                                                                                                                    });
                                                                                                                                })
                                                                                                                            });
                                                                                                                        });
                                                                                                                    });
                                                                                                                });
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
});
