function changeMods(){
            if(document.getElementById("dropdown").value == "mechanism"){
                document.getElementById('one').innerHTML = "Rack & Pinion";
                document.getElementById('one-href').href = "rackandpinion.php";
                document.getElementById('one-img').src = "img/front_mech_rackpinion.png";
                document.getElementById('two').innerHTML = "Crank";
                document.getElementById('two-href').href = "crank.php";
                document.getElementById('two-img').src = "img/front_mech_crank.png";
                document.getElementById('three').innerHTML = "Cam";
                document.getElementById('three-href').href = "cam.php";
                document.getElementById('three-img').src = "img/front_mech_cam.png";
                document.getElementById('four').innerHTML = "Spur Gears";
                document.getElementById('four-href').href = "#";
                document.getElementById('four-img').src = "img/front_mech_spur.png";
                document.getElementById('five').innerHTML = "Planetary Gears";
                document.getElementById('five-href').href = "planetary.php";
                document.getElementById('five-img').src = "img/front_mech_planetary.png";
                document.getElementById("six-href").style.visibility = "";
                document.getElementById('six-img').src = "img/front_mech_rackpinion.png";
                document.getElementById('seven-img').src = "img/front_mech_jansen.png";
            }
            else{
                document.getElementById('one').innerHTML = "Open-Close";
                document.getElementById('one-href').href = "open-close.php";
                document.getElementById('one-img').src = "img/front_motion_openclose.png";
                document.getElementById('two').innerHTML = "Up-Down";
                document.getElementById('two-href').href = "up-down.php";
                document.getElementById('two-img').src = "img/front_motion_updown.png";
                document.getElementById('three').innerHTML = "Flap";
                document.getElementById('three-href').href = "flapping.php";
                document.getElementById('three-img').src = "img/front_motion_flap.png";
                document.getElementById('four').innerHTML = "Rotate";
                document.getElementById('four-href').href = "#";
                document.getElementById('four-img').src = "img/front_motion_rotate.png";
                document.getElementById('five').innerHTML = "Walking";
                document.getElementById('five-href').href = "#";
                document.getElementById('five-img').src = "img/front_motion_walk.png";
                document.getElementById("six-href").style.visibility = "hidden";
                document.getElementById('six-img').src = "img/front_motion_flap.png";
            }
        }